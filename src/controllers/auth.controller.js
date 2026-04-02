// src/controllers/auth.controller.js

import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

import Admin from "../models/Admin.js";
import Volunteer from "../models/volunteer.js";
import Donor from "../models/Donor.js";

// Helper: generate JWT token
const generateToken = (id, role, type) => {
  return jwt.sign(
    { id, role, type },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // token valid for 7 days
  );
};

/*
========================
REGISTER
========================
*/
export const register = async (req, res) => {
  try {
    const { name, email, password, phone_number, type } = req.body;

    if (!name || !email || !password || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Select model
    let userModel;
    if (type === "admin") userModel = Admin;
    else if (type === "volunteer") userModel = Volunteer;
    else if (type === "donor") userModel = Donor;
    else return res.status(400).json({ message: "Invalid user type" });

    // Check if user exists
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      name,
      email,
      phone_number,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Registration successful",
      user: { id: user.id, name: user.name, email: user.email, phone_number: user.phone_number, type }
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

/*
========================
LOGIN
========================
*/
export const login = async (req, res) => {
  try {
    const { email, password, type } = req.body;

    if (!email || !password || !type) {
      return res.status(400).json({ message: "Email, password and type are required" });
    }

    let userModel;
    if (type === "admin") userModel = Admin;
    else if (type === "volunteer") userModel = Volunteer;
    else if (type === "donor") userModel = Donor;
    else return res.status(400).json({ message: "Invalid user type" });

    const user = await userModel.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user.id, user.role || null, type);

    // Update last login if available
    if (user.lastLogin !== undefined) {
      user.lastLogin = new Date();
      await user.save();
    }

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, phone_number: user.phone_number, type, role: user.role || null }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

/*
========================
FORGOT PASSWORD
========================
*/
export const forgotPassword = async (req, res) => {
  try {
    const { email, type } = req.body;

    if (!email || !type) return res.status(400).json({ message: "Email and type are required" });

    let userModel;
    if (type === "admin") userModel = Admin;
    else if (type === "volunteer") userModel = Volunteer;
    else if (type === "donor") userModel = Donor;
    else return res.status(400).json({ message: "Invalid user type" });

    const user = await userModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

    res.status(200).json({ message: "Password reset token generated", resetUrl });
  } catch (error) {
    res.status(500).json({ message: "Forgot password failed", error: error.message });
  }
};

/*
========================
RESET PASSWORD
========================
*/
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, type } = req.body;

    if (!password || !type) return res.status(400).json({ message: "Password and type are required" });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

    let userModel;
    if (type === "admin") userModel = Admin;
    else if (type === "volunteer") userModel = Volunteer;
    else if (type === "donor") userModel = Donor;
    else return res.status(400).json({ message: "Invalid user type" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({
      where: { resetToken: hashedToken, resetTokenExpiry: { [Op.gt]: Date.now() } }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Reset password failed", error: error.message });
  }
};

/*
========================
LOGOUT
========================
*/
export const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};