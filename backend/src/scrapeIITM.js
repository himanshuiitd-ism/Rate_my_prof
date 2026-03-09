/**
 * IIT Madras Faculty Scraper
 * Scrapes professor data from multiple IIT Madras department pages.
 *
 * Each department page has a different HTML structure, so we use
 * dedicated parsing functions per URL pattern.
 */

import https from "https";
import { fileURLToPath } from "url";
import axios from "axios";
import { load } from "cheerio";
import { connect, disconnect } from "mongoose";
import Professor from "./models/Professor.js";
import "dotenv/config";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const COLLEGE = "IIT Madras";

const axiosOpts = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  httpsAgent,
  timeout: 30000,
};

// ──────────────────────────────────────────────────
// Helper: resolve image URL
// ──────────────────────────────────────────────────
function resolveUrl(src, base) {
  if (!src) return undefined;
  // Skip data: URIs (lazy-load placeholders)
  if (src.startsWith("data:")) return undefined;
  try {
    return new URL(src, base).href;
  } catch {
    return undefined;
  }
}

// Helper: get real image src (handles lazy-loaded images)
function getImgSrc($img) {
  // Check data-src, data-lazy-src first (lazy-loading patterns)
  return (
    $img.attr("data-src") ||
    $img.attr("data-lazy-src") ||
    $img.attr("data-srcset")?.split(",")[0]?.split(" ")[0] ||
    $img.attr("src") ||
    undefined
  );
}

// ──────────────────────────────────────────────────
// TYPE A: outerfaculty.php / corefaculty.php pages
//   Used by: Math, CSE, Biotech, ChE
//   Structure: .faculty-card > .faculty-photo img
//              .faculty-card > .faculty-info > h3.faculty-name
// ──────────────────────────────────────────────────
async function scrapeTypeA(url, department) {
  console.log(`  📄 [TypeA] Scraping ${url}`);
  const { data } = await axios.get(url, axiosOpts);
  const $ = load(data);
  const profs = [];

  // Try multiple selectors — different depts use slightly different markup
  let cards = $(".faculty-card");
  if (cards.length === 0) cards = $(".card");
  if (cards.length === 0) cards = $(".fac-card");

  cards.each((_, el) => {
    const $card = $(el);

    // Name: try multiple selectors
    let name =
      $card.find("h3.faculty-name").text().trim() ||
      $card.find("h3").first().text().trim() ||
      $card.find(".faculty-name").text().trim() ||
      $card.find(".card-title").text().trim();

    if (!name) return;

    // Clean up name (remove extra whitespace)
    name = name.replace(/\s+/g, " ").trim();

    // Photo
    const imgEl = $card.find(".faculty-photo img, .card-img-top, img").first();
    const imgSrc = imgEl.attr("src") || imgEl.attr("data-src");
    const photoUrl = resolveUrl(imgSrc, url);

    // Profile link
    const linkEl = $card.find("a").first();
    const sourceUrl = resolveUrl(linkEl.attr("href"), url);

    profs.push({ name, photoUrl, sourceUrl, department, college: COLLEGE });
  });

  // Fallback: if no cards found, try parsing h3 tags (some pages list names in h3)
  if (profs.length === 0) {
    $("h3").each((_, el) => {
      const name = $(el).text().replace(/\s+/g, " ").trim();
      if (!name || name.length < 3 || name.length > 100) return;
      // Skip navigation-like h3s
      if (
        name.toLowerCase().includes("faculty") ||
        name.toLowerCase().includes("department")
      )
        return;

      const parentLink =
        $(el).closest("a").attr("href") || $(el).find("a").attr("href");
      const sourceUrl = resolveUrl(parentLink, url);

      // Try to find an image near this h3
      const img =
        $(el).parent().find("img").first().attr("src") ||
        $(el).closest("div").find("img").first().attr("src");
      const photoUrl = resolveUrl(img, url);

      profs.push({ name, photoUrl, sourceUrl, department, college: COLLEGE });
    });
  }

  console.log(`    ✓ Found ${profs.length} professors`);
  return profs;
}

// ──────────────────────────────────────────────────
// TYPE B: EE faculty page (ee.iitm.ac.in/people/)
//   Structure: .faculty-card with data-stream attr
//              .faculty-photo img
//              h3.faculty-name
// ──────────────────────────────────────────────────
async function scrapeTypeB_EE(url, department) {
  console.log(`  📄 [TypeB-EE] Scraping ${url}`);
  const { data } = await axios.get(url, axiosOpts);
  const $ = load(data);
  const profs = [];

  $(".faculty-card").each((_, el) => {
    const $card = $(el);

    let name =
      $card.find("h3.faculty-name").text().trim() ||
      $card.find("h3").first().text().trim();

    if (!name) return;
    name = name.replace(/\s+/g, " ").trim();

    const imgSrc = $card.find(".faculty-photo img").attr("src");
    const photoUrl = resolveUrl(imgSrc, url);

    const linkEl =
      $card.find("h3.faculty-name a").first() || $card.find("a").first();
    const sourceUrl = resolveUrl($(linkEl).attr("href"), url);

    profs.push({ name, photoUrl, sourceUrl, department, college: COLLEGE });
  });

  console.log(`    ✓ Found ${profs.length} professors`);
  return profs;
}

// ──────────────────────────────────────────────────
// TYPE C: Chemistry (chem.iitm.ac.in/faculty/)
//   GDLR theme: .gdlr-core-pbf-column contains both
//   the image (in gdlr-core-media-image) and the name (h2/h4)
// ──────────────────────────────────────────────────
async function scrapeTypeC_Chem(url, department) {
  console.log(`  📄 [TypeC-Chem] Scraping ${url}`);
  const { data } = await axios.get(url, axiosOpts);
  const $ = load(data);
  const profs = [];
  const seen = new Set();

  // Use GDLR column containers — each faculty is in a gdlr-core-pbf-column
  $(".gdlr-core-pbf-column").each((_, el) => {
    const $col = $(el);
    const heading = $col.find("h2, h3, h4").first();
    if (!heading.length) return;

    let name = heading.text().replace(/\s+/g, " ").trim();
    if (!name || name.length < 3 || name.length > 100) return;
    if (
      name.toLowerCase() === "faculty" ||
      name.toLowerCase().includes("department") ||
      name.toLowerCase().includes("campus")
    )
      return;

    if (seen.has(name)) return;
    seen.add(name);

    // Image is in the same column
    const $img = $col.find("img").first();
    const imgSrc = getImgSrc($img);
    const photoUrl = resolveUrl(imgSrc, url);

    // "More Detail" link
    const linkEl =
      $col.find("a[href*='chem.iitm.ac.in']").first() || $col.find("a").first();
    const sourceUrl = resolveUrl($(linkEl).attr("href"), url);

    profs.push({ name, photoUrl, sourceUrl, department, college: COLLEGE });
  });

  console.log(`    ✓ Found ${profs.length} professors`);
  return profs;
}

// ──────────────────────────────────────────────────
// TYPE D: DoMS (doms.iitm.ac.in)
//   Uses lazyloaded images: img.doms-ff2-img with
//   data-src containing the real URL (src has SVG placeholder)
//   Faculty cards have: .doms-ff2-img-box for image,
//   h3 for names, links in <a> tags
// ──────────────────────────────────────────────────
async function scrapeTypeD_WP(url, department) {
  console.log(`  📄 [TypeD-DoMS] Scraping ${url}`);
  const { data } = await axios.get(url, axiosOpts);
  const $ = load(data);
  const profs = [];
  const seen = new Set();

  // DoMS uses faculty cards with img.doms-ff2-img (lazyloaded)
  // and h3 tags for names. The cards are siblings.
  // Strategy: collect all faculty images and names in order and pair them.
  const images = [];
  $("img.doms-ff2-img").each((_, el) => {
    const $img = $(el);
    const imgSrc = getImgSrc($img);
    images.push(imgSrc);
  });

  const names = [];
  $("h3").each((_, el) => {
    let name = $(el).text().replace(/\s+/g, " ").trim();
    if (!name || name.length < 3 || name.length > 80) return;
    if (
      name.toLowerCase().includes("faculty") ||
      name.toLowerCase().includes("department") ||
      name.toLowerCase().includes("doms") ||
      name.toLowerCase().includes("menu")
    )
      return;
    if (seen.has(name)) return;
    seen.add(name);

    const parentLink =
      $(el).closest("a").attr("href") || $(el).find("a").attr("href");
    const sourceUrl = resolveUrl(parentLink, url);

    names.push({ name, sourceUrl });
  });

  // Pair images with names (they appear in the same order)
  for (let i = 0; i < names.length; i++) {
    const imgSrc = i < images.length ? images[i] : undefined;
    const photoUrl = resolveUrl(imgSrc, url);
    profs.push({ ...names[i], photoUrl, department, college: COLLEGE });
  }

  console.log(`    ✓ Found ${profs.length} professors`);
  return profs;
}

// ──────────────────────────────────────────────────
// TYPE E: HSS (hss.iitm.ac.in/faculty-members/)
//   Elementor image-box widgets. Each faculty card is
//   a div[data-widget_type="image-box.default"] that
//   contains:
//     figure.elementor-image-box-img > a > img  (photo)
//     h3.elementor-image-box-title > a           (name)
// ──────────────────────────────────────────────────
async function scrapeTypeE_HSS(url, department) {
  console.log(`  📄 [TypeE-HSS] Scraping ${url}`);
  const { data } = await axios.get(url, axiosOpts);
  const $ = load(data);
  const profs = [];
  const seen = new Set();

  // Primary strategy: each image-box widget is one faculty card
  $('[data-widget_type="image-box.default"]').each((_, el) => {
    const $card = $(el);

    // Name is in the h3 title link
    const $nameLink = $card.find("h3.elementor-image-box-title a").first();
    let name = $nameLink.text().replace(/\s+/g, " ").trim();
    if (!name || name.length < 3 || name.length > 80) return;

    // Skip nav/non-faculty text
    const lowerName = name.toLowerCase();
    if (
      lowerName.includes("faculty") ||
      lowerName.includes("department") ||
      lowerName.includes("centre") ||
      lowerName.includes("center") ||
      lowerName.includes("program") ||
      lowerName.includes("research") ||
      lowerName.includes("contact")
    ) return;

    if (seen.has(name)) return;
    seen.add(name);

    // Image is inside figure.elementor-image-box-img
    const $img = $card.find("figure.elementor-image-box-img img").first();
    const imgSrc = getImgSrc($img);
    const photoUrl = resolveUrl(imgSrc, url);

    // Source URL from the figure's anchor or name link
    const $figLink = $card.find("figure.elementor-image-box-img a").first();
    const href = $figLink.attr("href") || $nameLink.attr("href") || "";
    const sourceUrl = resolveUrl(href, url);

    profs.push({ name, photoUrl, sourceUrl, department, college: COLLEGE });
  });

  console.log(`    ✓ Found ${profs.length} professors`);
  return profs;
}

// ──────────────────────────────────────────────────
// TYPE F: ED (ed.iitm.ac.in/team.html)
//   h3 tags contain: "Name Research Area: ... Office: ..."
//   The name is the text before "Research Area:"
// ──────────────────────────────────────────────────
async function scrapeTypeF_ED(url, department) {
  console.log(`  📄 [TypeF-ED] Scraping ${url}`);
  const { data } = await axios.get(url, axiosOpts);
  const $ = load(data);
  const profs = [];
  const seen = new Set();

  // ED page: each faculty is in an h3 that contains:
  //   "Asokan T Research Area: ... Office: ... Email: ..."
  // We extract the name by splitting on "Research Area"
  $("h3").each((_, el) => {
    const fullText = $(el).text().replace(/\s+/g, " ").trim();
    if (!fullText || fullText.length < 5) return;

    // Split on "Research Area" to get the name part
    let name;
    if (fullText.includes("Research Area")) {
      name = fullText.split("Research Area")[0].trim();
    } else if (fullText.includes("Office:")) {
      name = fullText.split("Office:")[0].trim();
    } else {
      return; // Not a faculty entry
    }

    if (!name || name.length < 3 || name.length > 80) return;

    // Remove "(Head of the Department)" etc.
    name = name.replace(/\s*\(.*?\)\s*/g, "").trim();

    // Skip navigation-like h3s
    if (
      name.toLowerCase().includes("faculty") ||
      name.toLowerCase().includes("department") ||
      name.toLowerCase().includes("adjunct") ||
      name.toLowerCase().includes("professor of practice")
    )
      return;

    if (seen.has(name)) return;
    seen.add(name);

    // Find the "Click Here" personal website link
    const link = $(el).find("a").last();
    const sourceUrl = resolveUrl(link.attr("href"), url);

    // Try finding image in nearby elements
    const img =
      $(el).prev("img").attr("src") ||
      $(el).parent().find("img").first().attr("src");
    const photoUrl = resolveUrl(img, url);

    profs.push({ name, photoUrl, sourceUrl, department, college: COLLEGE });
  });

  console.log(`    ✓ Found ${profs.length} professors`);
  return profs;
}

// ──────────────────────────────────────────────────
// TYPE G: WSAI (wsai.iitm.ac.in/faculty/)
//   Uses .people-card containers with:
//   - img.people-card__image (has alt=name)
//   - .people-card__name for the name
//   - Relative image paths like /images/people/...
// ──────────────────────────────────────────────────
async function scrapeTypeG_WSAI(url, department) {
  console.log(`  📄 [TypeG-WSAI] Scraping ${url}`);
  const { data } = await axios.get(url, axiosOpts);
  const $ = load(data);
  const profs = [];
  const seen = new Set();

  // Primary: use .people-card containers
  $(".people-card").each((_, el) => {
    const $card = $(el);

    // Get name from the people-card__name or from img alt
    const $img = $card.find("img.people-card__image").first();
    let name =
      $card.find(".people-card__name, h3, h4").first().text().trim() ||
      $img.attr("alt") ||
      "";

    name = name.replace(/\s+/g, " ").trim();
    if (!name || name.length < 3 || name.length > 80) return;
    if (
      name.toLowerCase().includes("faculty") ||
      name.toLowerCase().includes("filter") ||
      name.toLowerCase().includes("contact")
    )
      return;

    if (seen.has(name)) return;
    seen.add(name);

    // Resolve image URL (relative paths like /images/people/...)
    const imgSrc = getImgSrc($img);
    const photoUrl = resolveUrl(imgSrc, url);

    const linkEl = $card.find("a").first();
    const sourceUrl = resolveUrl(linkEl.attr("href"), url);

    profs.push({ name, photoUrl, sourceUrl, department, college: COLLEGE });
  });

  console.log(`    ✓ Found ${profs.length} professors`);
  return profs;
}

// ──────────────────────────────────────────────────
// TYPE H: Civil (civil.iitm.ac.in/faculty.php?id=71)
//   Structure from inspection:
//   div#resinpt > table.col-sm-2 (one per faculty)
//     td.tdwdg > img.imgD[alt="Name"] (photo + name)
//     table.nmetbl (also contains name)
// ──────────────────────────────────────────────────
async function scrapeTypeH_Civil(url, department) {
  console.log(`  📄 [TypeH-Civil] Scraping ${url}`);
  const { data } = await axios.get(url, axiosOpts);
  const $ = load(data);
  const profs = [];
  const seen = new Set();

  // Primary approach: find img tags with class "imgD" inside #resinpt
  // These have alt="Professor Name" and src with the photo URL
  $("#resinpt img.imgD, #resinpt img.selector").each((_, el) => {
    const $img = $(el);
    let name = $img.attr("alt");
    if (!name || name.length < 3 || name.length > 80) return;
    name = name.replace(/\s+/g, " ").trim();

    if (seen.has(name)) return;
    seen.add(name);

    const imgSrc = $img.attr("src");
    const photoUrl = resolveUrl(imgSrc, url);

    // Profile link is in the enclosing <a> tag
    const linkEl = $img.closest("a");
    const sourceUrl = resolveUrl(linkEl.attr("href"), url);

    profs.push({ name, photoUrl, sourceUrl, department, college: COLLEGE });
  });

  // Fallback: try table.nmetbl or td.tdwdg for names
  if (profs.length === 0) {
    $("#resinpt table.col-sm-2").each((_, el) => {
      const $table = $(el);

      // Get name from img alt, or from td text, or from table.nmetbl
      let name =
        $table.find("img").first().attr("alt") ||
        $table.find(".nmetbl").text().trim() ||
        $table.find("td.tdwdg").text().trim();

      if (!name || name.length < 3 || name.length > 80) return;
      name = name.replace(/\s+/g, " ").trim();

      if (seen.has(name)) return;
      seen.add(name);

      const imgSrc = $table.find("img").first().attr("src");
      const photoUrl = resolveUrl(imgSrc, url);

      const linkEl = $table.find("a").first();
      const sourceUrl = resolveUrl(linkEl.attr("href"), url);

      profs.push({ name, photoUrl, sourceUrl, department, college: COLLEGE });
    });
  }

  // Last fallback: find all img tags in the page with civil admin URLs
  if (profs.length === 0) {
    $("img[src*='civilcont']").each((_, el) => {
      const $img = $(el);
      let name = $img.attr("alt");
      if (!name || name.length < 3 || name.length > 80) return;
      name = name.replace(/\s+/g, " ").trim();

      if (seen.has(name)) return;
      seen.add(name);

      const imgSrc = $img.attr("src");
      const photoUrl = resolveUrl(imgSrc, url);
      const sourceUrl = undefined;

      profs.push({ name, photoUrl, sourceUrl, department, college: COLLEGE });
    });
  }

  console.log(`    ✓ Found ${profs.length} professors`);
  return profs;
}

// ──────────────────────────────────────────────────
// Department config: URL → department name + scraper
// ──────────────────────────────────────────────────
const DEPARTMENTS = [
  {
    url: "https://math.iitm.ac.in/outerfaculty.php",
    department: "Mathematics",
    scraper: scrapeTypeA,
  },
  {
    url: "https://doms.iitm.ac.in/index.php/people/faculty/",
    department: "Management Studies",
    scraper: scrapeTypeD_WP,
  },
  {
    url: "https://hss.iitm.ac.in/faculty-members/",
    department: "Humanities and Social Sciences",
    scraper: scrapeTypeE_HSS,
  },
  {
    url: "https://ed.iitm.ac.in/team.html",
    department: "Engineering Design",
    scraper: scrapeTypeF_ED,
  },
  {
    url: "https://www.ee.iitm.ac.in/people/",
    department: "Electrical Engineering",
    scraper: scrapeTypeB_EE,
  },
  {
    url: "https://wsai.iitm.ac.in/faculty/",
    department: "Data Science and AI (WSAI)",
    scraper: scrapeTypeG_WSAI,
  },
  {
    url: "https://www.cse.iitm.ac.in/outerfaculty.php",
    department: "Computer Science and Engineering",
    scraper: scrapeTypeA,
  },
  {
    url: "https://civil.iitm.ac.in/faculty.php?id=71",
    department: "Civil Engineering",
    scraper: scrapeTypeH_Civil,
  },
  {
    url: "https://chem.iitm.ac.in/faculty/",
    department: "Chemistry",
    scraper: scrapeTypeC_Chem,
  },
  {
    url: "https://che.iitm.ac.in/corefaculty.php",
    department: "Chemical Engineering",
    scraper: scrapeTypeA,
  },
  {
    url: "https://biotech.iitm.ac.in/outerfaculty.php",
    department: "Biotechnology",
    scraper: scrapeTypeA,
  },
];

// ──────────────────────────────────────────────────
// Main: scrape all departments and upsert to DB
// ──────────────────────────────────────────────────
async function scrapeIITM() {
  console.log("\n╔════════════════════════════════════════╗");
  console.log("║   IIT Madras Faculty Scraper           ║");
  console.log("╚════════════════════════════════════════╝\n");

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("❌ No MONGO_URI in .env — can't upsert.");
    process.exit(1);
  }

  console.log("⏳ Connecting to MongoDB...");
  await connect(mongoUri);
  console.log("✅ Connected to MongoDB\n");

  let totalInserted = 0;
  let totalUpdated = 0;
  let totalSkipped = 0;
  const allProfs = [];

  for (const dept of DEPARTMENTS) {
    console.log(`\n🏛️  ${dept.department}`);
    console.log(`   URL: ${dept.url}`);
    try {
      const profs = await dept.scraper(dept.url, dept.department);
      allProfs.push(...profs);

      // Upsert each professor
      for (const p of profs) {
        try {
          const existing = await Professor.findOne({
            name: p.name,
            college: COLLEGE,
          });

          if (existing) {
            // Update fields
            if (p.photoUrl) existing.photoUrl = p.photoUrl;
            if (p.sourceUrl) existing.sourceUrl = p.sourceUrl;
            existing.department = p.department;
            existing.college = COLLEGE;
            existing.lastScrapedAt = new Date();
            await existing.save();
            totalUpdated++;
          } else {
            await Professor.create({
              ...p,
              lastScrapedAt: new Date(),
            });
            totalInserted++;
          }
        } catch (err) {
          console.error(`    ✗ Error upserting "${p.name}":`, err.message);
          totalSkipped++;
        }
      }
    } catch (err) {
      console.error(`  ❌ Failed to scrape ${dept.department}:`, err.message);
    }
  }

  console.log("\n╔════════════════════════════════════════╗");
  console.log("║          Scraping Complete              ║");
  console.log("╠════════════════════════════════════════╣");
  console.log(`║  Inserted:  ${String(totalInserted).padStart(4)}`);
  console.log(`║  Updated:   ${String(totalUpdated).padStart(4)}`);
  console.log(`║  Skipped:   ${String(totalSkipped).padStart(4)}`);
  console.log(`║  Total:     ${String(allProfs.length).padStart(4)}`);
  console.log("╚════════════════════════════════════════╝\n");

  await disconnect();
}

// Entry point
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  scrapeIITM()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("\n❌ Fatal error:", err);
      process.exit(1);
    });
}

export { scrapeIITM };
