import { Schema, model } from "mongoose";

const ProfessorSchema = new Schema({
  name: { type: String, required: true },
  photoUrl: { type: String },
  department: { type: String },
  sourceUrl: { type: String },
  lastScrapedAt: { type: Date },
});

export default model("Professor", ProfessorSchema);
