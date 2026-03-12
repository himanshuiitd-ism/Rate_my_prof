import { Router } from "express";
const router = Router();
import Professor from "../models/Professor.js";
import Rating from "../models/Rating.js";
import ChatMessage from "../models/ChatMessage.js";
import { upsertProfessors } from "../scrape.js";
import axios from "axios";
import https from "https";
import { load } from "cheerio";

// ── HSS image helpers ──────────────────────────────
const _httpsAgent = new https.Agent({ rejectUnauthorized: false });
const _axiosOpts = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  httpsAgent: _httpsAgent,
  timeout: 30000,
};
function _getImgSrc($img) {
  if (!$img || !$img.length) return undefined;
  return (
    $img.attr("src") ||
    $img.attr("data-src") ||
    $img.attr("data-lazy-src") ||
    $img.attr("data-srcset")?.split(" ")[0]
  );
}
function _resolveUrl(src, base) {
  if (!src || src.startsWith("data:")) return undefined;
  if (src.startsWith("http")) return src;
  try {
    return new URL(src, base).href;
  } catch {
    return undefined;
  }
}

// ⚠️ IMPORTANT: Put specific routes BEFORE parameterized routes!

// GET /api/professors/scrape - admin: run scraper
router.get("/scrape", async (req, res) => {
  try {
    console.log("Scrape endpoint hit");
    await upsertProfessors();
    res.json({ success: true, message: "Scraping completed" });
  } catch (err) {
    console.error("Scrape error:", err);
    res.status(500).json({ error: String(err.message) });
  }
});

// GET /api/professors/update-hss-images - update HSS photo URLs using Elementor image-box parser
router.get("/update-hss-images", async (req, res) => {
  const HSS_URL = "https://hss.iitm.ac.in/faculty-members/";
  const DEPT = "Humanities and Social Sciences";
  const COLLEGE = "IIT Madras";

  try {
    console.log("🖼️  Fetching HSS faculty page...");
    const { data } = await axios.get(HSS_URL, _axiosOpts);
    const $ = load(data);

    const scraped = [];
    const seen = new Set();

    // Each faculty card is an Elementor image-box widget
    $('[data-widget_type="image-box.default"]').each((_, el) => {
      const $card = $(el);
      const $nameLink = $card.find("h3.elementor-image-box-title a").first();
      let name = $nameLink.text().replace(/\s+/g, " ").trim();
      if (!name || name.length < 3 || name.length > 80) return;

      const ln = name.toLowerCase();
      if (
        [
          "faculty",
          "department",
          "centre",
          "center",
          "program",
          "research",
          "contact",
        ].some((k) => ln.includes(k))
      )
        return;
      if (seen.has(name)) return;
      seen.add(name);

      const $img = $card.find("figure.elementor-image-box-img img").first();
      const imgSrc = _getImgSrc($img);
      const photoUrl = _resolveUrl(imgSrc, HSS_URL);

      const $figLink = $card.find("figure.elementor-image-box-img a").first();
      const href = $figLink.attr("href") || $nameLink.attr("href") || "";
      const sourceUrl = _resolveUrl(href, HSS_URL);

      scraped.push({ name, photoUrl, sourceUrl });
    });

    console.log(`  Found ${scraped.length} faculty cards`);

    let updated = 0,
      notFound = 0,
      noImage = 0;
    const details = [];

    for (const { name, photoUrl, sourceUrl } of scraped) {
      if (!photoUrl) {
        noImage++;
        details.push({ name, status: "no_image" });
        continue;
      }

      // Case-insensitive match
      const doc = await Professor.findOne({
        name: {
          $regex: new RegExp(
            `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
            "i",
          ),
        },
        college: COLLEGE,
        department: DEPT,
      });

      if (!doc) {
        notFound++;
        details.push({ name, status: "not_in_db" });
        continue;
      }

      await Professor.updateOne(
        { _id: doc._id },
        { $set: { photoUrl, ...(sourceUrl ? { sourceUrl } : {}) } },
      );
      updated++;
      details.push({ name, status: "updated", photoUrl });
    }

    console.log(
      `  ✅ Updated: ${updated} | ❌ Not found: ${notFound} | ⚠️ No image: ${noImage}`,
    );
    res.json({
      success: true,
      total: scraped.length,
      updated,
      notFound,
      noImage,
      details,
    });
  } catch (err) {
    console.error("HSS image update error:", err);
    res.status(500).json({ error: String(err.message) });
  }
});

// GET /api/professors - list all with avg ratings
router.get("/", async (req, res) => {
  try {
    const { college } = req.query;
    console.log(
      `📋 GET /api/professors - Fetching professors with ratings and message counts${college ? ` for college: ${college}` : " (all colleges)"}`,
    );

    // Build match stage to filter by college if provided
    const matchStage = college ? { $match: { college: college.trim() } } : null;

    const profsWithStats = await Professor.aggregate([
      ...(matchStage ? [matchStage] : []),
      // 1. Join with Ratings
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "prof",
          as: "ratings",
        },
      },
      // 2. Join with ChatMessages
      {
        $lookup: {
          from: "chatmessages",
          localField: "_id",
          foreignField: "prof",
          as: "chatMessages",
        },
      },
      // 3. Project/Calculate stats
      {
        $project: {
          name: 1,
          photoUrl: 1,
          department: 1,
          college: 1,
          sourceUrl: 1,
          lastScrapedAt: 1,
          ratingCount: { $size: "$ratings" },
          commentCount: { $size: "$chatMessages" },
          // Calculate average score: prefer categories.score, fall back to score
          // Only calculate if there are ratings
          avgRating: {
            $cond: [
              { $gt: [{ $size: "$ratings" }, 0] },
              {
                $avg: {
                  $map: {
                    input: "$ratings",
                    as: "r",
                    in: {
                      // use nested $ifNull to safely fallback to 0
                      $ifNull: [
                        "$$r.categories.score",
                        { $ifNull: ["$$r.score", 0] },
                      ],
                    },
                  },
                },
              },
              0,
            ],
          },
        },
      },
      // 4. Sort by name
      { $sort: { name: 1 } },
    ]);

    console.log(`✅ Returning ${profsWithStats.length} professors`);
    res.json(profsWithStats);
  } catch (err) {
    console.error("❌ List professors error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/professors/:id/message - add a chat message
router.post("/:id/message", async (req, res) => {
  try {
    const profId = req.params.id;
    const { message } = req.body;
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message text required" });
    }
    const msg = new ChatMessage({ prof: profId, message: message.trim() });
    await msg.save();
    res.status(201).json({ success: true, message: msg });
  } catch (err) {
    console.error("❌ Save message error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/professors/:id - details + aggregated ratings + last messages
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📖 GET /api/professors/${id} - Fetching professor details`);

    const prof = await Professor.findById(id).lean();

    if (!prof) {
      console.log(`❌ Professor not found: ${id}`);
      return res.status(404).json({ message: "Professor not found" });
    }

    // Get all ratings
    const ratings = await Rating.find({ prof: prof._id });
    const messageCount = await ChatMessage.countDocuments({ prof: prof._id });

    // Calculate average with better error handling
    let avgRating = null;
    let totalScore = 0;
    let validRatings = 0;

    console.log(`Found ${ratings.length} ratings for professor ${prof.name}`);

    if (ratings.length > 0) {
      ratings.forEach((r, index) => {
        let score = null;

        // Check different possible structures
        if (r.categories) {
          if (
            typeof r.categories === "object" &&
            r.categories.score !== undefined
          ) {
            score = r.categories.score;
          } else if (r.categories instanceof Map) {
            score = r.categories.get("score");
          }
        }

        // Fallback: check if there's a direct score field
        if (score === null && r.score !== undefined) {
          score = r.score;
        }

        if (score !== null && score !== undefined && !isNaN(score)) {
          totalScore += Number(score);
          validRatings++;
        }
      });

      if (validRatings > 0) {
        avgRating = totalScore / validRatings;
        console.log(
          `Calculated average: ${avgRating} from ${validRatings} valid ratings`,
        );
      } else {
        console.log(
          "No valid ratings found - all scores were null/undefined/NaN",
        );
      }
    }

    // Last 50 messages
    const messages = await ChatMessage.find({ prof: prof._id })
      .sort({ createdAt: -1 })
      .limit(50);

    console.log(`Found ${messages.length} messages for ${prof.name}`);

    res.json({
      prof: {
        ...prof,
        avgRating,
        ratingCount: ratings.length,
        commentCount: messageCount,
      },
      messages: messages.reverse(),
    });
  } catch (err) {
    console.error("❌ Get professor error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/professors/:id/message - add a chat message
router.post("/:id/message", async (req, res) => {
  try {
    const profId = req.params.id;
    const { message } = req.body;
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message text required" });
    }
    const msg = new ChatMessage({ prof: profId, message: message.trim() });
    await msg.save();
    res.status(201).json({ success: true, message: msg });
  } catch (err) {
    console.error("❌ Save message error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/professors/:id/rate - submit rating
router.post("/:id/rate", async (req, res) => {
  try {
    const { id } = req.params;
    const { categories, comment } = req.body;

    console.log(`⭐ POST /api/professors/${id}/rate - Submitting rating`);

    const prof = await Professor.findById(id);
    if (!prof) {
      console.log(`❌ Professor not found: ${id}`);
      return res.status(404).json({ message: "Professor not found" });
    }

    // Validate categories
    if (!categories || typeof categories !== "object") {
      return res.status(400).json({ message: "Invalid categories" });
    }

    // Ensure score is a number
    if (categories.score === undefined || isNaN(categories.score)) {
      return res.status(400).json({ message: "Invalid score value" });
    }

    console.log("Saving rating:", {
      profId: id,
      profName: prof.name,
      score: categories.score,
    });

    const rating = new Rating({
      prof: prof._id,
      categories,
      comment: comment || "",
    });
    await rating.save();

    console.log("✅ Rating saved successfully");

    res.json({ success: true, rating });
  } catch (err) {
    console.error("❌ Rate professor error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
