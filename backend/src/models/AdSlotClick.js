import { Schema, model } from "mongoose";

/**
 * AdSlotClick Schema
 * Tracks clicks on all ad boxes (filled or empty)
 * Each physical box position is uniquely identified by: page + position + slotIndex
 */
const AdSlotClickSchema = new Schema(
  {
    // Unique slot identifier
    slotId: {
      type: String,
      required: true,
      unique: true,
      // Format: "page:position:slotIndex" e.g. "home:left:0"
      index: true,
    },
    page: {
      type: String,
      required: true,
      // e.g. "home", "IIT ISM Dhanbad", "IIT Madras"
    },
    position: {
      type: String,
      required: true,
      enum: ["left", "right", "top", "bottom"],
    },
    slotIndex: {
      type: Number,
      required: true,
      // 0-4 typically (5 slots per position on desktop)
    },
    adId: {
      type: Schema.Types.ObjectId,
      ref: "Ad",
      default: null,
      // null if this slot is empty/placeholder
    },
    clickCount: {
      type: Number,
      default: 0,
      // Total clicks on this slot
    },
    lastClickedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Compound index for efficient queries
AdSlotClickSchema.index({ page: 1, position: 1, slotIndex: 1 });
AdSlotClickSchema.index({ page: 1, position: 1 });

export default model("AdSlotClick", AdSlotClickSchema);
