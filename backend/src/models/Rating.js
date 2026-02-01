import { Schema, model } from "mongoose";

const RatingSchema = new Schema({
  prof: {
    type: Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
  },
  // Store categories as a plain object, not Map
  // This ensures better compatibility and easier querying
  categories: {
    type: Object,
    default: {},
  },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Add a virtual for easy score access
RatingSchema.virtual("score").get(function () {
  return this.categories?.score || 0;
});

// Ensure virtuals are included in JSON
RatingSchema.set("toJSON", { virtuals: true });
RatingSchema.set("toObject", { virtuals: true });

export default model("Rating", RatingSchema);
