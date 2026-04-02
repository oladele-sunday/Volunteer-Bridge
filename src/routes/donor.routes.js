import express from "express";
import {
    registerDonor,
    loginDonor,
    getDonorProfile,
    updateDonorProfile,
    getAllDonors
} from "../controllers/donor.controller.js";
import { authMiddleware, superAdminMiddleware } from "../middleware/auth.js"; // You need JWT auth middleware

const router = express.Router();

// Public routes
router.post("/register", registerDonor); // Donor registration
router.post("/login", loginDonor);       // Donor login

// Protected routes (requires donor login)
router.get("/me", authMiddleware, getDonorProfile);      // Get logged-in donor profile
router.put("/me", authMiddleware, updateDonorProfile);   // Update logged-in donor profile

// Admin-only route (optional)
router.get("/", authMiddleware, getAllDonors); // List all donors

export default router;