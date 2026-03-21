import { Schema, model } from "mongoose";

const CommunitySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    collegeId: { type: String, default: null, index: true },
    memberIds: { type: [String], default: [] }, // Clerk userIds
    memberProfiles: {
      type: [
        {
          userId: { type: String, required: true },
          displayName: { type: String, required: true, trim: true },
        },
      ],
      default: [],
    },
    memberCount: { type: Number, default: 0, index: true },
    createdBy: { type: String, required: true }, // Clerk userId
  },
  { timestamps: true },
);

CommunitySchema.index({ collegeId: 1, memberCount: -1 });
CommunitySchema.index({ memberIds: 1 });

export default model("Community", CommunitySchema);
