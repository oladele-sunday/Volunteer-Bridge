import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getProjectTasks,
  getMyTasks,
  createTask,
  assignTask,
  updateTaskStatus,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/my-tasks", authMiddleware, getMyTasks);
router.get("/projects/:projectId/tasks", authMiddleware, getProjectTasks);
router.post("/projects/:projectId/tasks", authMiddleware, createTask);
router.post("/:id/assign", authMiddleware, assignTask);
router.patch("/:id/status", authMiddleware, updateTaskStatus);

export default router;
