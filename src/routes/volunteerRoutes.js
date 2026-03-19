import express from "express";
import { getAllVolunteers, updateVolunteer, createVolunteer } from "../controllers/volunteer.controller.js";
import authMiddleware from "../middleware/auth.js";
import roleMiddleware from "../middleware/role.js";

const router = express.Router();

// Create volunteer
router.post("/", createVolunteer);

// Get all volunteers
router.get("/", authMiddleware, roleMiddleware("admin", "coordinator"), getAllVolunteers);

// Update volunteer (protected: admin can update any, volunteer updates self)

router.put("/:id", authMiddleware, updateVolunteer);

export default router;