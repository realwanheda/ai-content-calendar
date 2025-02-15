import express from "express";
import {
  createPost,
  updatePostAPI,
  addPostToUserAPI,
  deletePostAPI,
  getPostsOfUserAPI,
} from "../controllers/postController.js";

const router = express.Router();
router.post("/create", createPost);
router.post("/update", updatePostAPI);
router.post("/delete", deletePostAPI);
router.post("/add-post-to-user", addPostToUserAPI);
router.post("/get-posts", getPostsOfUserAPI);

export default router;
