// src/models/index.js
import sequelize from "../config/database.js";
import User from "./Admin.js";
import Volunteer from "./volunteer.js";
import Donation from "./Donation.js";
import Project from "./Project.js";
import Task from "./Task.js";
import Report from "./report.js";
import Notification from "./notification.model.js";

// ===== Associations =====

// User -> Volunteer
User.hasOne(Volunteer, { foreignKey: "user_id", as: "volunteerProfile" });
Volunteer.belongsTo(User, { foreignKey: "user_id", as: "user" });

// User -> Donation
User.hasMany(Donation, { foreignKey: "user_id", as: "donations" });
Donation.belongsTo(User, { foreignKey: "user_id", as: "donor" });

// Project -> Task
Project.hasMany(Task, { foreignKey: "project_id", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "project_id", as: "project" });

// ===== Report Associations =====

// User -> Report
User.hasMany(Report, { foreignKey: "user_id", as: "reports" });
Report.belongsTo(User, { foreignKey: "user_id", as: "reportsOwner" });

// Project -> Report
Project.hasMany(Report, { foreignKey: "project_id", as: "reports" });
Report.belongsTo(Project, { foreignKey: "project_id", as: "project" });

// Report -> Notification
Report.hasMany(Notification, { foreignKey: "report_id", as: "notifications" });
Notification.belongsTo(Report, { foreignKey: "report_id", as: "report" });

// Define relationships here
User.hasOne(Volunteer, { foreignKey: "userId" });
Volunteer.belongsTo(User, { foreignKey: "userId" });

export {
    sequelize,
    User,
    Volunteer,
    Donation,
    Project,
    Task,
    Report,
    Notification,

};