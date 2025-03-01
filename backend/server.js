import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import scheduleLinkedInPosts from "./linkedinScheduler.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.API || "http://localhost:5173", // Allow frontend domain
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    optionsSuccessStatus: 200,
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

connectDB().then(() => {
  scheduleLinkedInPosts(); // ✅ Start scheduling posts
});

app.listen(process.env.PORT || 5050, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5050}`)
);
