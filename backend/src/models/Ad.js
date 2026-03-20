import { Schema, model } from "mongoose";

/**
 * Ad Schema
 * Each ad belongs to a specific page context:
 *   - "home"          → Landing page
 *   - "IIT (ISM) Dhanbad" | "IIT Madras" | … → College-specific pages
 *   - "all"           → Shown on every page (fallback)
 */
const AdSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    linkUrl: { type: String, trim: true },
    page: {
      type: String,
      required: true,
      default: "all",
      // "home" | "all" | a college name string
    },
    position: {
      type: String,
      enum: ["left", "right", "top", "bottom"],
      default: "left",
    },
    order: { type: Number, default: 0 }, // display order within column
    isActive: { type: Boolean, default: true },
    bgColor: { type: String, default: "" }, // optional custom bg hex, e.g. "#1e293b"
    badge: { type: String, default: "" }, // small label like "SALE", "NEW", etc.
    clickCount: { type: Number, default: 0 }, // track number of clicks
  },
  { timestamps: true },
);

AdSchema.index({ page: 1, position: 1, order: 1 });

export default model("Ad", AdSchema);
