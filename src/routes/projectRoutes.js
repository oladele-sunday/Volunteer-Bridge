import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProjectStatus,
} from "../controllers/project.controller.js";
import { authMiddleware } from "../middleware/auth.js";
// import role from "../middleware/role.js";

const router = express.Router();

router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);
router.post("/", authMiddleware, createProject);
router.patch("/:id/status", authMiddleware, updateProjectStatus);

export default router;