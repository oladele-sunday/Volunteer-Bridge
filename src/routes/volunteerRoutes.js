import express from "express";
import { getAllVolunteers, updateVolunteer, createVolunteer } from "../controllers/volunteer.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import roleMiddleware from "../middleware/role.js";

const router = express.Router();

// Public route: volunteer self-registration
router.post("/register", createVolunteer);

// Protected route: get all volunteers (admin / coordinator only)
router.get("/", authMiddleware, roleMiddleware("admin", "superadmin", "coordinator"), getAllVolunteers);

// Protected route: update volunteer
// - Volunteer updates own profile
// - Admin / coordinator can update any volunteer
router.put("/:id", authMiddleware, updateVolunteer);

export default router;