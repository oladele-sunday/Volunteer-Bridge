import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getUserProfile,
  updateUserProfile,
  getVolunteerUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

// registered volunteer users for admin task assignment
router.get("/volunteers", authMiddleware, getVolunteerUsers);

export default router;
