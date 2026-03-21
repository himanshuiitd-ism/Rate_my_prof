import { Router } from "express";
import { getAuth } from "@clerk/express";
import FeatureSuggestion from "../models/FeatureSuggestion.js";

const router = Router();

function getGuestVoteKey(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    typeof forwarded === "string"
      ? forwarded.split(",")[0].trim()
      : req.ip || "unknown";
  const userAgent = req.headers["user-agent"] || "unknown";
  return `guest:${ip}:${String(userAgent).slice(0, 60)}`;
}

// GET /api/feature-suggestions
router.get("/", async (req, res) => {
  try {
    const suggestions = await FeatureSuggestion.find({})
      .sort({ votesCount: -1, createdAt: -1 })
      .lean();

    res.json({ suggestions });
  } catch (err) {
    console.error("❌ List feature suggestions error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/feature-suggestions
router.post("/", async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth?.userId || null;
    const { name, email, featureTitle, details } = req.body || {};

    if (
      !featureTitle ||
      typeof featureTitle !== "string" ||
      !featureTitle.trim()
    ) {
      return res.status(400).json({ error: "Feature title is required" });
    }
    if (!details || typeof details !== "string" || !details.trim()) {
      return res.status(400).json({ error: "Feature details are required" });
    }

    const suggestion = await FeatureSuggestion.create({
      userId,
      name:
        typeof name === "string" && name.trim()
          ? name.trim().slice(0, 80)
          : "Anonymous",
      email: typeof email === "string" ? email.trim().slice(0, 120) : "",
      featureTitle: featureTitle.trim().slice(0, 120),
      details: details.trim().slice(0, 1500),
    });

    res.status(201).json({
      suggestion,
      message: "Thanks! Your feature suggestion was submitted.",
    });
  } catch (err) {
    console.error("❌ Create feature suggestion error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/feature-suggestions/:id/vote - toggle vote
router.post("/:id/vote", async (req, res) => {
  try {
    const auth = getAuth(req);
    const voterKey = auth?.userId || getGuestVoteKey(req);

    const suggestion = await FeatureSuggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ error: "Suggestion not found" });
    }

    if (!Array.isArray(suggestion.votedBy)) {
      suggestion.votedBy = [];
    }

    const alreadyVoted = suggestion.votedBy.includes(voterKey);
    if (alreadyVoted) {
      suggestion.votedBy = suggestion.votedBy.filter(
        (entry) => entry !== voterKey,
      );
    } else {
      suggestion.votedBy.push(voterKey);
    }

    suggestion.votesCount = suggestion.votedBy.length;
    await suggestion.save();

    res.json({
      suggestion,
      voted: !alreadyVoted,
    });
  } catch (err) {
    console.error("❌ Vote feature suggestion error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
