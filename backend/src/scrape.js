import https from "https";
import { fileURLToPath } from "url";
import axios from "axios";
import { load } from "cheerio";
import { connect, disconnect } from "mongoose";
import Professor from "./models/Professor.js";
import "dotenv/config";

const baseUrl = "https://www.iitism.ac.in/all-faculty";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function fetchProfessors() {
  console.log("Fetching from:", baseUrl);

  const { data, status } = await axios.get(baseUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    httpsAgent,
    timeout: 15000,
  });

  console.log("Response status:", status);
  console.log("HTML length:", data.length);

  const $ = load(data);
  const profs = [];

  // Each professor is inside:
  //   #facultyShow > .col-md-3 > .event-box-campus
  //     img          → photo
  //     h3           → name
  //     a.view-more  → profile link
  const cards = $("#facultyShow .col-md-3 .event-box-campus");
  console.log(`Found ${cards.length} faculty cards`);

  cards.each((i, el) => {
    const $card = $(el);

    const name = $card.find("h3").text().trim();
    const imgSrc = $card.find("img").attr("src");
    const profileLink = $card.find("a.view-more").attr("href");

    if (!name) return; // skip empty cards

    profs.push({
      name,
      photoUrl: imgSrc ? new URL(imgSrc, baseUrl).href : undefined,
      sourceUrl: profileLink ? new URL(profileLink, baseUrl).href : undefined,
    });
  });

  console.log(`Extracted ${profs.length} professors`);

  // Log first 3 for quick sanity check
  profs.slice(0, 3).forEach((p) => {
    console.log(`  - ${p.name}`);
    console.log(`    Photo: ${p.photoUrl || "none"}`);
    console.log(`    Link:  ${p.sourceUrl || "none"}`);
  });

  return profs;
}

async function upsertProfessors() {
  console.log("\n=== Starting Professor Scraper ===");
  console.log("Target URL:", baseUrl);
  console.log("Time:", new Date().toISOString());
  console.log("================================\n");

  // --- Connect to MongoDB before doing anything with the DB ---
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("❌ No MONGO_URI in .env — can't upsert.");
    process.exit(1);
  }
  console.log("Connecting to MongoDB...");
  await connect(mongoUri);
  console.log("✓ Connected to MongoDB\n");

  // --- Scrape ---
  const profs = await fetchProfessors();

  if (profs.length === 0) {
    console.warn("\n⚠️  No professors found. Check the website structure.");
    await disconnect();
    return;
  }

  console.log(`\n📊 Found ${profs.length} professors. Upserting...\n`);

  let inserted = 0;
  let updated = 0;

  for (const p of profs) {
    try {
      const existing = await Professor.findOne({ name: p.name });
      if (existing) {
        existing.photoUrl = p.photoUrl;
        existing.sourceUrl = p.sourceUrl;
        existing.lastScrapedAt = new Date();
        await existing.save();
        updated++;
      } else {
        await Professor.create({ ...p, lastScrapedAt: new Date() });
        inserted++;
      }
    } catch (err) {
      console.error(`  ✗ Error upserting "${p.name}":`, err.message);
    }
  }

  console.log("\n=== Scraper Complete ===");
  console.log(`  ✓ Inserted: ${inserted}`);
  console.log(`  ✓ Updated:  ${updated}`);
  console.log(`  ✓ Total:    ${profs.length}`);
  console.log("========================\n");

  await disconnect();
}

// Entry-point guard — works correctly on Windows
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  upsertProfessors()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("\n❌ Fatal error:", err);
      process.exit(1);
    });
}

export { fetchProfessors, upsertProfessors };
