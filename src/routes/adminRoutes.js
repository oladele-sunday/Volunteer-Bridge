import express from "express";
import { 
    getAdminProfile, 
    updateAdminProfile, 
    getAllAdmins, 
    updateAdminRole, 
    deleteAdmin 
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { superAdminMiddleware } from "../middleware/auth.js";


const router = express.Router();

// Profile routes for logged-in admin
router.get("/profile", authMiddleware, getAdminProfile);
router.put("/profile", authMiddleware, updateAdminProfile);

// Admin management routes (Admin / SuperAdmin only)
// Example: Only superadmin can update roles or delete other admins
router.get("/", authMiddleware, superAdminMiddleware, getAllAdmins); 
router.put("/:id/role", authMiddleware, superAdminMiddleware, updateAdminRole);
router.delete("/:id", authMiddleware, superAdminMiddleware, deleteAdmin);

export default router;