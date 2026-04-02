import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { createNotification } from "../services/notification.js";

const allowedTaskStatuses = ["pending", "in_progress", "done"];

export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findProjectById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const tasks = await Task.findTasksByProjectId(projectId);

    return res.status(200).json({
      success: true,
      message: "Project tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.error("getProjectTasks error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch project tasks",
    });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.findAll({
      where: { assignedTo: userId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Assigned tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.error("getMyTasks error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch assigned tasks",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, dueDate, estimatedHours, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    if (status && !allowedTaskStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid task status. Allowed values: ${allowedTaskStatuses.join(", ")}`,
      });
    }

    const project = await Project.findProjectById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.status === "completed" || project.status === "archived") {
      return res.status(400).json({
        success: false,
        message: "Cannot add task to a completed or archived project",
      });
    }

    const payload = {
      projectId,
      title: title.trim(),
      description: description?.trim() || null,
      dueDate: dueDate || null,
      estimatedHours: estimatedHours || null,
      status: status || "pending",
      createdBy: req.user?.id || null,
    };

    const newTask = await Task.createTask(payload);

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.error("createTask error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

export const assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, volunteerId, taskTitle } = req.body;

    const assignedUserId = userId || volunteerId;

    if (!assignedUserId) {
      return res.status(400).json({
        success: false,
        message: "userId or volunteerId is required",
      });
    }

    const task = await Task.findTaskById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const assignment = await Task.assignTaskToVolunteer(id, assignedUserId);

    await createNotification(
      assignedUserId,
      "New Task Assigned",
      `You have been assigned a task: ${taskTitle || task.title}`
    );

    return res.status(200).json({
      success: true,
      message: "Task assigned and notification created",
      data: assignment,
    });
  } catch (error) {
    console.error("assignTask error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to assign task",
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !allowedTaskStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid task status. Allowed values: ${allowedTaskStatuses.join(", ")}`,
      });
    }

    const task = await Task.findTaskById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await Task.updateTaskStatus(id, status, req.user?.id);

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("updateTaskStatus error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update task status",
    });
  }
};
