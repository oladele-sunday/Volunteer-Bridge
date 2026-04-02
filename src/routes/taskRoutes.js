import express from "express";
import {
  getProjectTasks,
  createTask,
  assignTask,
  updateTaskStatus,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.js";
// import role from "../middleware/role.js";

const router = express.Router();

router.get("/projects/:projectId/tasks", authMiddleware, getProjectTasks);
router.post("/projects/:projectId/tasks", authMiddleware, createTask);
router.post("/:id/assign", authMiddleware, assignTask);
router.patch("/:id/status", authMiddleware, updateTaskStatus);

export default router;