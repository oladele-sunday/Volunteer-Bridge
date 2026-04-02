import express from "express";
import {
    systemReport,
    createReport,
    getReportById,
    getReportsByUser,
    getReportsByProject,
} from "../controllers/report.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Existing system-wide report

router.get("/system", authMiddleware, systemReport);

//endpoints
router.post("/", authMiddleware, createReport);                       // Create a report
router.get("/:id", authMiddleware, getReportById);                    // Get single report
router.get("/user/:userId", authMiddleware, getReportsByUser);        // Reports by user
router.get("/project/:projectId", authMiddleware, getReportsByProject); // Reports by project

export default router;