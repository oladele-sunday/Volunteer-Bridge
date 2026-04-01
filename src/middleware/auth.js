// auth.js
import jwt from "jsonwebtoken";
import User from "../models/Admin.js";

// Auth middleware
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// SuperAdmin middleware
export const superAdminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied, superadmin only" });
  }
  next();
};
export default authMiddleware;