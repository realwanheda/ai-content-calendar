import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
    title: { type: String, required: true }, // Added title field
    content: { type: String, required: true }, // Added content field
    scheduledDate: { type: Date, required: true, default: new Date() },
    platforms: { type: [String], required: true }, // Array of platforms (Facebook, X, Instagram)
    status: { type: String, enum: ["pending", "posted"], default: "pending" },
  },
  { timestamps: true } // This will add createdAt and updatedAt fields automatically
);

export default mongoose.model("Post", PostSchema);
