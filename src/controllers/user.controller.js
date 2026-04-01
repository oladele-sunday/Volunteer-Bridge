import User from "../models/user.js";
import Volunteer from "../models/volunteer.js"; // optional if volunteer data needed
import bcrypt from "bcryptjs";

//Get the profile of the currently logged-in user



export const getUserProfile = async (req, res) => {
    try {
        res.json(req.user); // req.user comes from authMiddleware
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update the profile of the current user

export const updateUserProfile = async (req, res) => {
    try {
        const user = req.user;

        const { name, email, phone_number, password } = req.body;

        if (name) user.name = name;
        if (email) user.email = email.toLowerCase();
        if (phone_number) user.phone_number = phone_number;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a list of all users (Admin / SuperAdmin only)


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password", "resetToken", "verifyToken"] },
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Update user role or status (Admin / SuperAdmin only)


export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, isActive } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (role) user.role = role; // validate role enum if needed
        if (isActive !== undefined) user.isActive = isActive;

        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a user (Admin / SuperAdmin only)

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};