import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import configuration from "./src/config/env.js";
import { corsOptions } from "./src/config/cors.js";
import pool from "./src/config/database.js"; // optional for raw queries
import userRoutes from "./src/routes/userRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import volunteerRoutes from "./src/routes/volunteerRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import errorMiddleware from "./src/middleware/error.js";
import { sequelize } from "./src/models/index.js"; // Sequelize instance with models
import donationRoutes from "./src/routes/donationRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

await sequelize.sync({ force: true });

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorMiddleware);

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to VolunteerBridge API",
    status: "running",
    version: "1.0.0"
  });
});

app.use("/api/projects", projectRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
// Health check
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1"); // optional, just checks MySQL connection
    res.json({ status: "ok", date: new Date() });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server & sync Sequelize
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");

    // Create/update tables automatically
    await sequelize.sync({ alter: true });
    console.log("All tables synced successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
    process.exit(1);
  }
})();