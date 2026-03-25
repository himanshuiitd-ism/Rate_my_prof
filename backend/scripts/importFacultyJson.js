import { readFile } from "fs/promises";
import path from "path";
import { connect, disconnect } from "mongoose";
import "dotenv/config";
import Professor from "../src/models/Professor.js";

function normalizeSpace(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstPresentString(obj, keys) {
  for (const key of keys) {
    const value = obj?.[key];
    if (typeof value === "string" && normalizeSpace(value)) {
      return normalizeSpace(value);
    }
  }
  return "";
}

function normalizeCollegeName(rawCollege) {
  const college = normalizeSpace(rawCollege).toLowerCase();

  if (!college) return "";
  if (college.includes("guwahati")) return "IIT Guwahati";
  if (
    college.includes("(bhu)") ||
    (college.includes("bhu") && college.includes("varanasi"))
  ) {
    return "IIT (BHU) Varanasi";
  }
  if (college.includes("madras")) return "IIT Madras";
  if (college.includes("dhanbad") || college.includes("ism")) {
    return "IIT (ISM) Dhanbad";
  }

  return normalizeSpace(rawCollege);
}

function parseArgs(argv) {
  const files = [];

  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];

    if (token === "--file" || token === "-f") {
      const file = argv[i + 1];
      if (!file) {
        throw new Error("Missing file path after --file");
      }
      files.push(file);
      i++;
    } else {
      files.push(token);
    }
  }

  return files;
}

async function importOneFile(filePath) {
  const absolutePath = path.resolve(filePath);
  const raw = await readFile(absolutePath, "utf8");
  const entries = JSON.parse(raw);

  if (!Array.isArray(entries)) {
    throw new Error(`Expected JSON array in ${absolutePath}`);
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const item of entries) {
    const name = firstPresentString(item, [
      "name",
      "professor_name",
      "full_name",
    ]);
    const department = firstPresentString(item, [
      "department",
      "branch",
      "dept",
    ]);
    const photoUrl = firstPresentString(item, [
      "photoUrl",
      "photo_url",
      "image",
      "image_url",
    ]);
    const sourceUrl = firstPresentString(item, [
      "sourceUrl",
      "source_url",
      "profile_url",
      "profile",
      "url",
    ]);
    const collegeRaw = firstPresentString(item, [
      "college",
      "institute",
      "university",
    ]);
    const college = normalizeCollegeName(collegeRaw);

    if (!name) {
      skipped++;
      continue;
    }

    const payload = {
      name,
      department: department || "",
      college: college || "",
      photoUrl: photoUrl || "",
      sourceUrl: sourceUrl || "",
      lastScrapedAt: new Date(),
    };

    const existing = await Professor.findOne({
      name: payload.name,
      college: payload.college,
    });

    if (existing) {
      existing.department = payload.department;
      existing.photoUrl = payload.photoUrl;
      existing.sourceUrl = payload.sourceUrl;
      existing.lastScrapedAt = payload.lastScrapedAt;
      await existing.save();
      updated++;
    } else {
      await Professor.create(payload);
      inserted++;
    }
  }

  return {
    absolutePath,
    total: entries.length,
    inserted,
    updated,
    skipped,
  };
}

async function main() {
  const files = parseArgs(process.argv.slice(2));

  if (!files.length) {
    console.error(
      "Usage: npm run import:faculty -- --file <path-to-json> [--file <path-to-json> ...]",
    );
    process.exit(1);
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI is missing in environment.");
    process.exit(1);
  }

  await connect(mongoUri);

  try {
    for (const filePath of files) {
      const result = await importOneFile(filePath);
      console.log(`\nImported ${result.absolutePath}`);
      console.log(`  Total:    ${result.total}`);
      console.log(`  Inserted: ${result.inserted}`);
      console.log(`  Updated:  ${result.updated}`);
      console.log(`  Skipped:  ${result.skipped}`);
    }
  } finally {
    await disconnect();
  }
}

main().catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});
