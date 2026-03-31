import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Volunteer from "../models/volunteer.js";
import Donor from "../models/Donor.js";

// JWT Auth Middleware
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Identify user type (pass type in token: admin, volunteer, donor)
        let user;
        switch (decoded.type) {
            case "admin":
                user = await Admin.findByPk(decoded.id);
                break;
            case "volunteer":
                user = await Volunteer.findByPk(decoded.id);
                break;
            case "donor":
                user = await Donor.findByPk(decoded.id);
                break;
            default:
                return res.status(401).json({ message: "Invalid token type" });
        }

        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user; // full object
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Role-based middleware
export const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: insufficient permissions" });
        }
        next();
    };
};

export default authMiddleware;