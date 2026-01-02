import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, adminOnly, getUserById);
router.post("/", protect, adminOnly, createUser);
router.put("/:id", protect, adminOnly, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route accessed",
    user: req.user,
  });
});

// Admin only routes

export default router;
