import express from "express";
import {
  addPostToUserAPI,
  createPost,
  deletePostAPI,
  getPostsOfUserAPI,
  updatePostAPI,
} from "../controllers/postController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create", verifyJWT, createPost);
router.post("/update", verifyJWT, updatePostAPI);
router.post("/delete", verifyJWT, deletePostAPI);
router.post("/add-post-to-user", verifyJWT, addPostToUserAPI);
router.post("/get-posts", verifyJWT, getPostsOfUserAPI);

export default router;
