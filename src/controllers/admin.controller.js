// admin.controller.js

import Admin from "../models/Admin.js"; // Admin model only
import bcrypt from "bcryptjs";

// Get profile of currently logged-in admin
export const getAdminProfile = async (req, res) => {
    try {
        res.json(req.user); // req.user comes from authMiddleware
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update profile of current admin
export const updateAdminProfile = async (req, res) => {
    try {
        const admin = req.user;
        const { name, email, phone_number, password } = req.body;

        if (name) admin.name = name;

        if (email && email !== admin.email) {
            const existing = await Admin.findOne({ where: { email } });
            if (existing)
                return res.status(400).json({ message: "Email already in use" });
            admin.email = email.toLowerCase();
        }

        if (phone_number) admin.phone_number = phone_number;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);
        }

        await admin.save();

        // Exclude sensitive fields
        const { password: _, resetToken, verifyToken, ...safeAdmin } = admin.toJSON();

        res.json(safeAdmin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all admins (Admin / SuperAdmin only)
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            attributes: { exclude: ["password", "resetToken", "verifyToken"] },
        });
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update admin role or status (SuperAdmin only ideally)
export const updateAdminRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, isActive } = req.body;

        const admin = await Admin.findByPk(id);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const allowedRoles = ["admin", "superadmin"];
        if (role && allowedRoles.includes(role)) {
            // Prevent self-role downgrade
            if (req.user.id === admin.id && role !== req.user.role) {
                return res.status(400).json({ message: "Cannot change your own role" });
            }
            admin.role = role;
        }

        if (isActive !== undefined) admin.isActive = isActive;

        await admin.save();

        const { password: _, resetToken, verifyToken, ...safeAdmin } = admin.toJSON();
        res.json(safeAdmin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete an admin (SuperAdmin only ideally)
export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent self-deletion
        if (req.user.id === parseInt(id)) {
            return res.status(400).json({ message: "Cannot delete your own account" });
        }

        const admin = await Admin.findByPk(id);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        await admin.destroy();
        res.json({ message: "Admin deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};