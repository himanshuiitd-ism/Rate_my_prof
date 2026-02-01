import { Router } from "express";
const router = Router();
import Professor from "../models/Professor.js";
import Rating from "../models/Rating.js";
import ChatMessage from "../models/ChatMessage.js";
import { upsertProfessors } from "../scrape.js";

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

// GET /api/professors - list all with avg ratings
router.get("/", async (req, res) => {
  try {
    const profs = await Professor.find().sort({ name: 1 }).lean();

    // Calculate average rating for each professor
    const profsWithRatings = await Promise.all(
      profs.map(async (prof) => {
        const ratings = await Rating.find({ prof: prof._id });

        let avgRating = null;
        let totalScore = 0;
        let validRatings = 0;

        if (ratings.length > 0) {
          // Try multiple ways to get the score
          ratings.forEach((r) => {
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
          }
        }

        return {
          ...prof,
          avgRating,
          ratingCount: ratings.length,
        };
      }),
    );

    res.json(profsWithRatings);
  } catch (err) {
    console.error("List professors error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/professors/:id - details + aggregated ratings + last messages
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prof = await Professor.findById(id).lean();

    if (!prof) {
      return res.status(404).json({ message: "Professor not found" });
    }

    // Get all ratings
    const ratings = await Rating.find({ prof: prof._id });

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

        console.log(`Rating ${index + 1}:`, {
          score,
          categories: r.categories,
          rawRating: r,
        });

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

    res.json({
      prof: {
        ...prof,
        avgRating,
        ratingCount: ratings.length,
      },
      messages: messages.reverse(),
    });
  } catch (err) {
    console.error("Get professor error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/professors/:id/rate - submit rating
router.post("/:id/rate", async (req, res) => {
  try {
    const { id } = req.params;
    const { categories, comment } = req.body;

    const prof = await Professor.findById(id);
    if (!prof) {
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
      categories,
      comment,
      score: categories.score,
    });

    const rating = new Rating({
      prof: prof._id,
      categories,
      comment: comment || "",
    });
    await rating.save();

    console.log("Rating saved:", rating);

    // Emit update via socket
    const io = req.app.get("io");
    if (io) {
      io.to(`prof_${id}`).emit("prof_update", {
        profId: id,
        rating: rating,
      });
    }

    res.json({ success: true, rating });
  } catch (err) {
    console.error("Rate professor error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
