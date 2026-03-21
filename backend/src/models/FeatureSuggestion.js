import { Schema, model } from "mongoose";

const FeatureSuggestionSchema = new Schema(
  {
    userId: { type: String, default: null, index: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, default: "", trim: true, maxlength: 120 },
    featureTitle: { type: String, required: true, trim: true, maxlength: 120 },
    details: { type: String, required: true, trim: true, maxlength: 1500 },
    votesCount: { type: Number, default: 0, index: true },
    votedBy: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["new", "reviewing", "planned", "implemented", "rejected"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true },
);

FeatureSuggestionSchema.index({ createdAt: -1 });

export default model("FeatureSuggestion", FeatureSuggestionSchema);
