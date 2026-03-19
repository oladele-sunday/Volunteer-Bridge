import Volunteer from "../models/volunteer.js";
import User from "../models/user.js";             // optional: verify user exists


// Create volunteer

export const createVolunteer = async (req, res) => {
    try {
        const { userId, skills, availability, status } = req.body;

        // Optional: check if user exists
        const user = await User.findByPk(userId);
        if (!user) return res.status(400).json({ message: "Invalid userId" });

        // Check if volunteer profile already exists
        const existing = await Volunteer.findOne({ where: { userId } });
        if (existing)
            return res.status(400).json({ message: "Volunteer profile already exists" });

        const volunteer = await Volunteer.create({
            userId,
            skills,
            availability,
            status: status || "active",
        });

        res.status(201).json(volunteer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get all volunteers

export const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.findAll();
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update volunteer

export const updateVolunteer = async (req, res) => {
    try {
        const { skills, availability, status } = req.body;

        const volunteer = await Volunteer.findOne({
            where: { userId: req.user.id }
        });

        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }

        volunteer.skills = skills || volunteer.skills;
        volunteer.availability = availability || volunteer.availability;
        volunteer.status = status || volunteer.status;

        await volunteer.save();

        res.json(volunteer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};