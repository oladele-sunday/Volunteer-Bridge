import { User, Volunteer } from "../models/index.js";


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
        // Fetch all volunteers and include user info
        const volunteers = await Volunteer.findAll({
            include: {
                model: User,
                attributes: ["id", "name"] // return only what frontend needs
            }
        });

        // Format the response
        const formatted = volunteers.map(vol => ({
            id: vol.id,
            skills: vol.skills,
            availability: vol.availability,
            status: vol.status,
            createdAt: vol.createdAt,
            updatedAt: vol.updatedAt,
            user: {
                id: vol.User.id,
                name: vol.User.name
            }
        }));

        res.json(formatted);
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

        // Update fields
        volunteer.skills = skills || volunteer.skills;
        volunteer.availability = availability || volunteer.availability;
        volunteer.status = status || volunteer.status;

        await volunteer.save();

        // Fetch updated volunteer with user info
        const updatedVolunteer = await Volunteer.findOne({
            where: { id: volunteer.id },
            include: {
                model: User,
                attributes: ["id", "name"]
            }
        });

        // Custom response format
        res.json({
            id: updatedVolunteer.id,
            skills: updatedVolunteer.skills,
            availability: updatedVolunteer.availability,
            status: updatedVolunteer.status,
            user: {
                id: updatedVolunteer.User.id,
                name: updatedVolunteer.User.name
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};