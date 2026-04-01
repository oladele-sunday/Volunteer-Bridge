import express from "express";
import {
  systemReport,
  createReport,
  getAllReports,
  getReportById,
  getReportsByUser,
  getReportsByProject,
} from "../controllers/report.controller.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/system", authMiddleware, systemReport);

// put specific routes before /:id
router.post("/", authMiddleware, createReport);
router.get("/", authMiddleware, getAllReports);
router.get("/user/:userId", authMiddleware, getReportsByUser);
router.get("/project/:projectId", authMiddleware, getReportsByProject);
router.get("/:id", authMiddleware, getReportById);

export default router;
