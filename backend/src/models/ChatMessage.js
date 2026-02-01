import { Schema, model } from "mongoose";

const ChatMessageSchema = new Schema({
  prof: {
    type: Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("ChatMessage", ChatMessageSchema);
