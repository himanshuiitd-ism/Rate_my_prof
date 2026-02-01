import { Router } from "express";
const router = Router();
import Professor from "../models/Professor.js";
import Rating from "../models/Rating.js";
import ChatMessage from "../models/ChatMessage.js";
import { upsertProfessors } from "../scrape.js";

// ⚠️ IMPORTANT: Put specific routes BEFORE parameterized routes!

// GET /api/professors/scrape - admin: run scraper
// This MUST come before /:id route or it will be treated as an ID
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

// GET /api/professors - list all
router.get("/", async (req, res) => {
  try {
    const profs = await Professor.find().sort({ name: 1 });
    res.json(profs);
  } catch (err) {
    console.error("List professors error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/professors/:id - details + aggregated ratings + last messages
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prof = await Professor.findById(id);

    if (!prof) {
      return res.status(404).json({ message: "Professor not found" });
    }

    // Aggregated ratings
    const agg = await Rating.aggregate([
      { $match: { prof: prof._id } },
      { $project: { categories: 1 } },
      {
        $group: {
          _id: null,
          categories: { $push: "$categories" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Compute simple averages
    let averages = {};
    if (agg.length) {
      const maps = agg[0].categories;
      const sums = {};
      let count = maps.length;
      maps.forEach((m) => {
        for (const [k, v] of Object.entries(m)) {
          sums[k] = (sums[k] || 0) + v;
        }
      });
      for (const k of Object.keys(sums)) {
        averages[k] = Number((sums[k] / count).toFixed(2));
      }
    }

    // Last 50 messages
    const messages = await ChatMessage.find({ prof: prof._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      prof,
      averages,
      messages: messages.reverse(),
      totalRatings: agg[0]?.count || 0,
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

    const rating = new Rating({
      prof: prof._id,
      categories,
      comment: comment || "",
    });
    await rating.save();

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
