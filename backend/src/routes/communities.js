import { Router } from "express";
import { getAuth, requireAuth } from "@clerk/express";
import multer from "multer";
import path from "path";
import Community from "../models/Community.js";
import CommunityMessage from "../models/CommunityMessage.js";

const router = Router();

// Keep original filename (including extension) so browsers
// can infer the correct content-type when opening downloads.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

// Helper to build slug from name
function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// GET /api/communities?collegeId=...&search=...
router.get("/", async (req, res) => {
  try {
    const { collegeId, search } = req.query;
    const auth = getAuth(req);
    const userId = auth?.userId || null;

    const filter = {};
    if (collegeId) {
      filter.collegeId = collegeId;
    }
    if (search && search.trim()) {
      filter.name = { $regex: search.trim(), $options: "i" };
    }

    const communities = await Community.find(filter).lean();

    // Order: joined first (if logged-in), then by memberCount desc
    const joined = [];
    const others = [];
    for (const c of communities) {
      const isMember = userId && c.memberIds?.includes(userId);
      if (isMember) joined.push(c);
      else others.push(c);
    }
    joined.sort(
      (a, b) => b.memberCount - a.memberCount || a.name.localeCompare(b.name),
    );
    others.sort(
      (a, b) => b.memberCount - a.memberCount || a.name.localeCompare(b.name),
    );

    res.json({ joined, others });
  } catch (err) {
    console.error("❌ List communities error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/communities - create community (auth required)
router.post("/", requireAuth(), async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth?.userId;
    const { name, description, collegeId, creatorDisplayName } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }

    const baseSlug = slugify(name);
    if (!baseSlug) {
      return res
        .status(400)
        .json({ error: "Name must include letters or numbers" });
    }
    let slug = baseSlug;
    let counter = 1;
    // Ensure unique slug
    while (await Community.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const community = await Community.create({
      name: name.trim(),
      slug,
      description: (description || "").trim(),
      collegeId: collegeId || null,
      memberIds: [userId],
      memberProfiles: [
        {
          userId,
          displayName:
            typeof creatorDisplayName === "string" && creatorDisplayName.trim()
              ? creatorDisplayName.trim().slice(0, 40)
              : "Creator",
        },
      ],
      memberCount: 1,
      createdBy: userId,
    });

    res.status(201).json(community);
  } catch (err) {
    console.error("❌ Create community error:", err);
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ error: "A community with this name already exists" });
    }
    res.status(500).json({ error: err.message });
  }
});

// POST /api/communities/:id/join - join a community (auth required)
router.post("/:id/join", requireAuth(), async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;
    const { id } = req.params;
    const { displayName } = req.body || {};

    const resolvedDisplayName =
      typeof displayName === "string" && displayName.trim()
        ? displayName.trim().slice(0, 40)
        : "Anonymous";

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    if (!Array.isArray(community.memberProfiles)) {
      community.memberProfiles = [];
    }

    if (!community.memberIds.includes(userId)) {
      community.memberIds.push(userId);
      community.memberProfiles.push({
        userId,
        displayName: resolvedDisplayName,
      });
      community.memberCount = community.memberIds.length;
      await community.save();
    } else if (typeof displayName === "string" && displayName.trim()) {
      const existingProfile = community.memberProfiles.find(
        (profile) => profile.userId === userId,
      );
      if (existingProfile) {
        existingProfile.displayName = resolvedDisplayName;
      } else {
        community.memberProfiles.push({
          userId,
          displayName: resolvedDisplayName,
        });
      }
      await community.save();
    }

    res.json(community);
  } catch (err) {
    console.error("❌ Join community error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/communities/:id/messages?cursor=<ISO>&limit=50
router.get("/:id/messages", async (req, res) => {
  try {
    const { id } = req.params;
    const { cursor, limit = 50 } = req.query;
    const take = Math.min(Number(limit) || 50, 100);

    const community = await Community.findById(id).lean();
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const msgFilter = { communityId: id };
    if (cursor) {
      msgFilter.createdAt = { $lt: new Date(cursor) };
    }

    const messages = await CommunityMessage.find(msgFilter)
      .sort({ createdAt: -1 })
      .limit(take + 1)
      .lean();

    const hasMore = messages.length > take;
    const sliced = hasMore ? messages.slice(0, take) : messages;
    const nextCursor =
      hasMore && sliced.length > 0
        ? sliced[sliced.length - 1].createdAt.toISOString()
        : null;

    res.json({
      community,
      messages: sliced,
      nextCursor,
    });
  } catch (err) {
    console.error("❌ List community messages error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/communities/:id/messages - send a message (auth + membership required)
router.post("/:id/messages", requireAuth(), async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;
    const { id } = req.params;
    const {
      contentType = "text",
      text,
      gifUrl,
      emoji,
      fileUrl,
      authorDisplayName,
    } = req.body;

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    if (!Array.isArray(community.memberProfiles)) {
      community.memberProfiles = [];
    }

    const isMember = community.memberIds.includes(userId);
    if (!isMember) {
      return res
        .status(403)
        .json({ error: "You must join this community to send messages" });
    }

    const hasText = typeof text === "string" && text.trim().length > 0;
    const hasGif = typeof gifUrl === "string" && gifUrl.trim().length > 0;
    const hasFile = typeof fileUrl === "string" && fileUrl.trim().length > 0;
    const hasEmoji = typeof emoji === "string" && emoji.trim().length > 0;

    if (!hasText && !hasGif && !hasFile && !hasEmoji) {
      return res
        .status(400)
        .json({ error: "Message must include text, GIF, emoji, or a file" });
    }

    const memberProfile = community.memberProfiles?.find(
      (profile) => profile.userId === userId,
    );
    const resolvedDisplayName =
      memberProfile?.displayName?.trim() ||
      (typeof authorDisplayName === "string" ? authorDisplayName.trim() : "") ||
      "Anonymous";

    if (!memberProfile) {
      community.memberProfiles.push({
        userId,
        displayName: resolvedDisplayName,
      });
      await community.save();
    }

    const message = await CommunityMessage.create({
      communityId: community._id,
      authorId: userId,
      authorDisplayName: resolvedDisplayName,
      contentType,
      text: hasText ? text.trim() : "",
      gifUrl: gifUrl || "",
      emoji: emoji || "",
      fileUrl: fileUrl || "",
    });

    res.status(201).json(message);
  } catch (err) {
    console.error("❌ Create community message error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/communities/:communityId/messages/:messageId/like - toggle like
router.post(
  "/:communityId/messages/:messageId/like",
  requireAuth(),
  async (req, res) => {
    try {
      const auth = getAuth(req);
      const userId = auth.userId;
      const { messageId } = req.params;

      const msg = await CommunityMessage.findById(messageId);
      if (!msg) {
        return res.status(404).json({ error: "Message not found" });
      }

      const already = msg.likedBy.includes(userId);
      if (already) {
        msg.likedBy = msg.likedBy.filter((id) => id !== userId);
      } else {
        msg.likedBy.push(userId);
      }
      msg.likesCount = msg.likedBy.length;
      await msg.save();

      res.json(msg);
    } catch (err) {
      console.error("❌ Like message error:", err);
      res.status(500).json({ error: err.message });
    }
  },
);

// POST /api/communities/:communityId/messages/:messageId/report
router.post(
  "/:communityId/messages/:messageId/report",
  requireAuth(),
  async (req, res) => {
    try {
      const auth = getAuth(req);
      const userId = auth.userId;
      const { messageId } = req.params;

      const msg = await CommunityMessage.findById(messageId);
      if (!msg) {
        return res.status(404).json({ error: "Message not found" });
      }

      if (!msg.reportedBy.includes(userId)) {
        msg.reportedBy.push(userId);
        msg.reportsCount = msg.reportedBy.length;
        await msg.save();
      }

      res.json(msg);
    } catch (err) {
      console.error("❌ Report message error:", err);
      res.status(500).json({ error: err.message });
    }
  },
);

// DELETE /api/communities/:communityId/messages/:messageId - sender can delete own, admin can delete any
router.delete(
  "/:communityId/messages/:messageId",
  requireAuth(),
  async (req, res) => {
    try {
      const auth = getAuth(req);
      const userId = auth.userId;
      const { communityId, messageId } = req.params;

      const community = await Community.findById(communityId);
      if (!community) {
        return res.status(404).json({ error: "Community not found" });
      }

      const msg = await CommunityMessage.findOne({
        _id: messageId,
        communityId,
      });
      if (!msg) {
        return res.status(404).json({ error: "Message not found" });
      }

      // Allow deletion if user is the message sender OR the community owner (admin)
      const isSender = msg.authorId === userId;
      const isAdmin = community.createdBy === userId;

      if (!isSender && !isAdmin) {
        return res
          .status(403)
          .json({ error: "You can only delete your own messages" });
      }

      await CommunityMessage.findOneAndDelete({
        _id: messageId,
        communityId,
      });

      res.json({ success: true });
    } catch (err) {
      console.error("❌ Delete message error:", err);
      res.status(500).json({ error: err.message });
    }
  },
);

// POST /api/communities/:id/remove-member - community owner can remove member
router.post("/:id/remove-member", requireAuth(), async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;
    const { id } = req.params;
    const { memberId } = req.body;

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    if (community.createdBy !== userId) {
      return res
        .status(403)
        .json({ error: "Only the community creator can remove members" });
    }

    if (!Array.isArray(community.memberProfiles)) {
      community.memberProfiles = [];
    }

    community.memberIds = community.memberIds.filter((m) => m !== memberId);
    community.memberProfiles = community.memberProfiles.filter(
      (profile) => profile.userId !== memberId,
    );
    community.memberCount = community.memberIds.length;
    await community.save();

    res.json(community);
  } catch (err) {
    console.error("❌ Remove member error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/communities/:id/upload - file upload for messages
router.post(
  "/:id/upload",
  requireAuth(),
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "File is required" });
      }
      // Build absolute URL based on this backend host so it works
      // in both local dev and production (Render).
      const base = `${req.protocol}://${req.get("host")}`.replace(/\/$/, "");
      const fileUrl = `${base}/uploads/${req.file.filename}`;
      res.status(201).json({ fileUrl });
    } catch (err) {
      console.error("❌ File upload error:", err);
      res.status(500).json({ error: err.message });
    }
  },
);

export default router;
