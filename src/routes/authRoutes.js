// src/routes/auth.route.js
import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// ----------------------
// PUBLIC ROUTES
// ----------------------

// Register: type must be sent in body: { name, email, password, phone_number, type }
router.post("/register", register);

// Login: type must be sent in body: { email, password, type }
router.post("/login", login);

// Forgot password: { email, type }
router.post("/forgot-password", forgotPassword);

// Reset password: token in params, type in body
router.post("/reset-password/:token", resetPassword);

// ----------------------
// PROTECTED ROUTES
// ----------------------

// Logout: just requires a valid token
router.post("/logout", authMiddleware, logout);

// Get current logged-in user info
router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;