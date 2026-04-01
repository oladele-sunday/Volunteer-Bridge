// src/middleware/auth.js

import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Volunteer from "../models/volunteer.js";
import Donor from "../models/Donor.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let userModel;

    if (decoded.type === "admin") userModel = Admin;
    else if (decoded.type === "volunteer") userModel = Volunteer;
    else if (decoded.type === "donor") userModel = Donor;
    else return res.status(401).json({ message: "Invalid user type" });

    const user = await userModel.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      type: decoded.type
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};