import { Schema, model } from "mongoose";

const RatingSchema = new Schema({
  prof: {
    type: Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
  },
  categories: { type: Map, of: Number },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model("Rating", RatingSchema);
