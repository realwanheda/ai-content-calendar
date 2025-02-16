import express from "express";
import {
  getCurrentUser,
  login,
  logoutUser,
  register,
} from "../controllers/authController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/getCurrentUser", verifyJWT, getCurrentUser);
router.post("/logout", verifyJWT, logoutUser);

export default router;
