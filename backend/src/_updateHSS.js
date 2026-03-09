/**
 * Update HSS professor images only.
 * Scrapes the HSS page and bulk-updates photoUrl for existing professors.
 */
import "dotenv/config";
import mongoose from "mongoose";
import axios from "axios";
import https from "https";
import { load } from "cheerio";
import Professor from "./models/Professor.js";

const MONGO_URI = process.env.MONGO_URI;
const HSS_URL = "https://hss.iitm.ac.in/faculty-members/";
const COLLEGE = "IIT Madras";
const DEPT = "Humanities and Social Sciences";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const axiosOpts = {
  headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  httpsAgent,
  timeout: 30000,
};

function getImgSrc($img) {
  if (!$img || !$img.length) return undefined;
  return (
    $img.attr("src") ||
    $img.attr("data-src") ||
    $img.attr("data-lazy-src") ||
    $img.attr("data-srcset")?.split(" ")[0]
  );
}

function resolveUrl(src, base) {
  if (!src || src.startsWith("data:")) return undefined;
  if (src.startsWith("http")) return src;
  try { return new URL(src, base).href; } catch { return undefined; }
}

async function scrapeHSS() {
  console.log("Fetching HSS page...");
  const { data } = await axios.get(HSS_URL, axiosOpts);
  const $ = load(data);
  const profs = [];
  const seen = new Set();

  $('[data-widget_type="image-box.default"]').each((_, el) => {
    const $card = $(el);

    const $nameLink = $card.find("h3.elementor-image-box-title a").first();
    let name = $nameLink.text().replace(/\s+/g, " ").trim();
    if (!name || name.length < 3 || name.length > 80) return;

    const lowerName = name.toLowerCase();
    if (
      lowerName.includes("faculty") || lowerName.includes("department") ||
      lowerName.includes("centre") || lowerName.includes("center") ||
      lowerName.includes("program") || lowerName.includes("research") ||
      lowerName.includes("contact")
    ) return;

    if (seen.has(name)) return;
    seen.add(name);

    const $img = $card.find("figure.elementor-image-box-img img").first();
    const imgSrc = getImgSrc($img);
    const photoUrl = resolveUrl(imgSrc, HSS_URL);

    const $figLink = $card.find("figure.elementor-image-box-img a").first();
    const href = $figLink.attr("href") || $nameLink.attr("href") || "";
    const sourceUrl = resolveUrl(href, HSS_URL);

    profs.push({ name, photoUrl, sourceUrl });
  });

  console.log(`Found ${profs.length} HSS faculty cards`);
  return profs;
}

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const scraped = await scrapeHSS();

  let updated = 0, notFound = 0, noImage = 0;

  for (const { name, photoUrl, sourceUrl } of scraped) {
    if (!photoUrl) {
      console.log(`  ⚠️  No image for: ${name}`);
      noImage++;
      continue;
    }

    // Try exact match first, then case-insensitive
    let doc = await Professor.findOne({ name, college: COLLEGE, department: DEPT });
    if (!doc) {
      doc = await Professor.findOne({
        name: { $regex: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
        college: COLLEGE,
        department: DEPT,
      });
    }

    if (!doc) {
      console.log(`  ❌ Not in DB: "${name}"`);
      notFound++;
      continue;
    }

    await Professor.updateOne(
      { _id: doc._id },
      { $set: { photoUrl, ...(sourceUrl ? { sourceUrl } : {}) } }
    );
    console.log(`  ✅ Updated: ${name}`);
    updated++;
  }

  console.log(`\n━━━ Done ━━━`);
  console.log(`  Updated  : ${updated}`);
  console.log(`  No image : ${noImage}`);
  console.log(`  Not in DB: ${notFound}`);
  console.log(`  Total    : ${scraped.length}`);

  await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
