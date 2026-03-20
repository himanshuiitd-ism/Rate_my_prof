import { Router } from "express";
import Ad from "../models/Ad.js";
import AdSlotClick from "../models/AdSlotClick.js";

const router = Router();

// GET /api/ads?page=home   – returns all active ads for a page (incl. "all" fallback)
router.get("/", async (req, res) => {
  try {
    const page = req.query.page || "all";
    const ads = await Ad.find({
      isActive: true,
      page: { $in: [page, "all"] },
    }).sort({ position: 1, order: 1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ads  – create a new ad (admin)
router.post("/", async (req, res) => {
  try {
    const ad = await Ad.create(req.body);
    res.status(201).json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/ads/:id  – update an ad
router.put("/:id", async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ad) return res.status(404).json({ error: "Ad not found" });
    res.json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/ads/:id
router.delete("/:id", async (req, res) => {
  try {
    await Ad.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/ads/seed  – seed sample ads (dev only)
router.post("/seed", async (req, res) => {
  try {
    await Ad.deleteMany({});
    const samples = [
      // ── HOME PAGE ads ──────────────────────────────
      {
        title: "Chargeback.io",
        description: "Prevent chargebacks on autopilot",
        linkUrl: "https://www.chargeback.io/",
        page: "home",
        position: "left",
        order: 1,
        bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      {
        title: "Devbox",
        description: "Instant dev environments with open source",
        linkUrl: "https://devbox.gg/ui/",
        page: "home",
        position: "left",
        order: 2,
        bgColor: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
      },
      {
        title: "ZeroLeaks",
        description: "Red-team your AI agents for prompt injection",
        linkUrl: "https://zeroleaks.ai/",
        page: "home",
        position: "right",
        order: 1,
        bgColor: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      },
      {
        title: "himanshu.dev",
        description: "Join the entrepreneurship journey with me",
        linkUrl: "https://himanshuiid-ism.vercel.app/",
        page: "home",
        position: "left",
        order: 3,
        bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },

      // ── IIT (ISM) Dhanbad page ads ─────────────────
      {
        title: "Chargeback.io",
        description: "Prevent chargebacks on autopilot",
        linkUrl: "https://www.chargeback.io/",
        page: "IIT (ISM) Dhanbad",
        position: "left",
        order: 1,
        bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      {
        title: "ZeroLeaks",
        description: "Red-team your AI agents for prompt injection",
        linkUrl: "https://zeroleaks.ai/",
        page: "IIT (ISM) Dhanbad",
        position: "right",
        order: 1,
        bgColor: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      },
      {
        title: "himanshu.dev",
        description: "Join the entrepreneurship journey with me",
        linkUrl: "https://himanshuiid-ism.vercel.app/",
        page: "IIT (ISM) Dhanbad",
        position: "left",
        order: 2,
        bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },

      // ── IIT Madras page ads ─────────────────────────
      {
        title: "GetLate.dev",
        description: "Find warm leads and book sales calls automatically",
        linkUrl: "https://getlate.dev/",
        page: "IIT Madras",
        position: "left",
        order: 1,
        bgColor: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
      },
      {
        title: "Devbox",
        description: "Instant dev environments with open source",
        linkUrl: "https://devbox.gg/ui/",
        page: "IIT Madras",
        position: "right",
        order: 1,
        bgColor: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
      },
      {
        title: "himanshu.dev",
        description: "Join the entrepreneurship journey with me",
        linkUrl: "https://himanshuiid-ism.vercel.app/",
        page: "IIT Madras",
        position: "left",
        order: 2,
        bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
    ];
    await Ad.insertMany(samples);
    res.json({ success: true, count: samples.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ads/slots/click – track click on any ad slot (filled or empty)
router.post("/slots/click", async (req, res) => {
  try {
    const { page, position, slotIndex, adId } = req.body;

    if (!page || !position || slotIndex === undefined) {
      return res.status(400).json({
        error: "Missing required fields: page, position, slotIndex",
      });
    }

    const parsedSlotIndex = Number(slotIndex);
    if (!Number.isInteger(parsedSlotIndex) || parsedSlotIndex < 0) {
      return res.status(400).json({
        error: "slotIndex must be a non-negative integer",
      });
    }

    // Create unique slot identifier
    const slotId = `${page}:${position}:${parsedSlotIndex}`;

    // Upsert click count atomically for this slot
    const slotClick = await AdSlotClick.findOneAndUpdate(
      { slotId },
      {
        $set: {
          page,
          position,
          slotIndex: parsedSlotIndex,
          lastClickedAt: new Date(),
          ...(adId ? { adId } : {}),
        },
        $inc: { clickCount: 1 },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    res.json(slotClick);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ads/:id/click – increment click count for an ad
router.post("/:id/click", async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      { $inc: { clickCount: 1 } },
      { new: true },
    );
    if (!ad) return res.status(404).json({ error: "Ad not found" });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/ads/slots/stats?page=home&position=left – get click stats for all slots
router.get("/slots/stats", async (req, res) => {
  try {
    const { page, position } = req.query;

    const query = {};
    if (page) query.page = page;
    if (position) query.position = position;

    const stats = await AdSlotClick.find(query).sort({ slotIndex: 1 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/ads/slots/stats/summary – grouped slot stats by page and position
router.get("/slots/stats/summary", async (_req, res) => {
  try {
    const summary = await AdSlotClick.aggregate([
      { $sort: { page: 1, position: 1, slotIndex: 1 } },
      {
        $group: {
          _id: { page: "$page", position: "$position" },
          totalClicks: { $sum: "$clickCount" },
          slots: {
            $push: {
              slotId: "$slotId",
              slotIndex: "$slotIndex",
              clickCount: "$clickCount",
              adId: "$adId",
              lastClickedAt: "$lastClickedAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          page: "$_id.page",
          position: "$_id.position",
          totalClicks: 1,
          slots: 1,
        },
      },
      { $sort: { page: 1, position: 1 } },
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
