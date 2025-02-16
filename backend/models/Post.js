import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
    title: { type: String, required: true }, // Added title field
    content: { type: String, required: true }, // Added content field
    scheduledDate: { type: String, required: true },
    platforms: { type: [String], required: true }, // Array of platforms (Facebook, X, Instagram)
    status: { type: String, default: "pending" },
  },
  { timestamps: true } // This will add createdAt and updatedAt fields automatically
);

export default mongoose.model("Post", PostSchema);
