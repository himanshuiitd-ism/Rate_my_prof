import { Schema, model } from "mongoose";

const CommunityMessageSchema = new Schema(
  {
    communityId: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
      index: true,
    },
    authorId: { type: String, required: true }, // Clerk userId
    authorDisplayName: { type: String, required: true },
    contentType: {
      type: String,
      enum: ["text", "gif", "emoji", "file"],
      default: "text",
      index: true,
    },
    text: { type: String, default: "" },
    gifUrl: { type: String, default: "" },
    emoji: { type: String, default: "" },
    fileUrl: { type: String, default: "" },
    likesCount: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] }, // Clerk userIds
    reportsCount: { type: Number, default: 0 },
    reportedBy: { type: [String], default: [] },
  },
  { timestamps: true },
);

CommunityMessageSchema.index({ communityId: 1, createdAt: -1 });

export default model("CommunityMessage", CommunityMessageSchema);

