import Report from "../models/report.js";
import Project from "../models/Project.js";
import User from "../models/user.js";
import { getSystemReport } from "../services/report.js";

// Existing system-wide report
export const systemReport = async (req, res) => {
  try {
    const report = await getSystemReport();
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new report
export const createReport = async (req, res) => {
  try {
    const { title, content, projectId, taskId } = req.body;

    const report = await Report.create({
      title,
      content,
      userId: req.user.id,
      projectId,
      taskId,
    });

    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("createReport error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get ALL reports (admin only)
export const getAllReports = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    const reports = await Report.findAll({
      include: [
        { model: User, as: "reportsOwner", attributes: ["id", "name", "email"] },
        { model: Project, as: "project", attributes: ["id", "name"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id, {
      include: [
        { model: User, as: "reportsOwner", attributes: ["id", "name", "email"] },
        { model: Project, as: "project", attributes: ["id", "name"] },
      ],
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all reports by a user
export const getReportsByUser = async (req, res) => {
  try {
    const reports = await Report.findAll({
      where: { userId: req.params.userId },
      include: [{ model: Project, as: "project", attributes: ["id", "name"] }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all reports for a project
export const getReportsByProject = async (req, res) => {
  try {
    const reports = await Report.findAll({
      where: { projectId: req.params.projectId },
      include: [{ model: User, as: "reportsOwner", attributes: ["id", "name", "email"] }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
