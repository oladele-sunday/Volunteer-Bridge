import Donor from "../models/Donor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new donor
export const registerDonor = async (req, res) => {
    try {
        const { name, email, phone_number, password } = req.body;

        // Check if donor already exists
        const existing = await Donor.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: "Donor already exists" });

        // Hash password if provided
        let hashedPassword = null;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const donor = await Donor.create({
            name,
            email,
            phone_number,
            password: hashedPassword,
        });

        // Return safe donor info
        const { password: _, ...safeDonor } = donor.toJSON();
        res.status(201).json(safeDonor);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Donor login
export const loginDonor = async (req, res) => {
    try {
        const { email, password } = req.body;

        const donor = await Donor.findOne({ where: { email } });
        if (!donor) return res.status(400).json({ message: "Invalid email or password" });

        // If password is set, compare
        if (!donor.password || !(await bcrypt.compare(password, donor.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: donor.id, email: donor.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, donor: { id: donor.id, name: donor.name, email: donor.email } });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get donor profile
export const getDonorProfile = async (req, res) => {
    try {
        const donor = req.user; // comes from auth middleware
        res.json(donor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update donor profile
export const updateDonorProfile = async (req, res) => {
    try {
        const donor = req.user;
        const { name, email, phone_number, password } = req.body;

        if (name) donor.name = name;
        if (email && email !== donor.email) {
            const existing = await Donor.findOne({ where: { email } });
            if (existing) return res.status(400).json({ message: "Email already in use" });
            donor.email = email.toLowerCase();
        }
        if (phone_number) donor.phone_number = phone_number;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            donor.password = await bcrypt.hash(password, salt);
        }

        await donor.save();
        const { password: _, ...safeDonor } = donor.toJSON();
        res.json(safeDonor);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Optional: admin can get all donors
export const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.findAll({
            attributes: { exclude: ["password"] },
        });
        res.json(donors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};