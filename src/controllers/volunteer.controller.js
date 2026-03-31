// volunteer.controller.js
import Volunteer from "../models/volunteer.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a volunteer
export const createVolunteer = async (req, res) => {
    try {
        const { name, email, phone_number, password, skills, availability } = req.body;

        // Check if email already exists
        const existing = await Volunteer.findOne({ where: { email } });
        if (existing)
            return res.status(400).json({ message: "Volunteer with this email already exists" });

        // Create volunteer
        const volunteer = await Volunteer.create({
            name,
            email,
            phone_number,
            password, // model hook will hash
            skills,
            availability
        });

        res.status(201).json({
            id: volunteer.id,
            name: volunteer.name,
            email: volunteer.email,
            phone_number: volunteer.phone_number,
            skills: volunteer.skills,
            availability: volunteer.availability,
            status: volunteer.status,
            isVerified: volunteer.isVerified,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all volunteers
export const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.findAll({
            attributes: ["id", "name", "email", "phone_number", "skills", "availability", "status"]
        });

        res.json(volunteers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update volunteer
export const updateVolunteer = async (req, res) => {
    try {
        // Assuming req.user.id comes from JWT auth middleware
        const volunteer = await Volunteer.findByPk(req.user.id);
        if (!volunteer)
            return res.status(404).json({ message: "Volunteer not found" });

        const { name, email, phone_number, skills, availability, status } = req.body;

        volunteer.name = name || volunteer.name;
        volunteer.email = email || volunteer.email;
        volunteer.phone_number = phone_number || volunteer.phone_number;
        volunteer.skills = skills || volunteer.skills;
        volunteer.availability = availability || volunteer.availability;
        volunteer.status = status || volunteer.status;

        await volunteer.save();

        res.json({
            id: volunteer.id,
            name: volunteer.name,
            email: volunteer.email,
            phone_number: volunteer.phone_number,
            skills: volunteer.skills,
            availability: volunteer.availability,
            status: volunteer.status,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Optional: Volunteer login
export const loginVolunteer = async (req, res) => {
    try {
        const { email, password } = req.body;

        const volunteer = await Volunteer.findOne({ where: { email } });
        if (!volunteer)
            return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await volunteer.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" });

        // Generate JWT
        const token = jwt.sign(
            { id: volunteer.id, email: volunteer.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, volunteer: { id: volunteer.id, name: volunteer.name, email: volunteer.email } });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};