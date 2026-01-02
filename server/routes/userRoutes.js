import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route accessed",
    user: req.user,
  });
});

// Admin only routes

router
  .route("/")
  .get(protect, adminOnly, getUsers)
  .post(protect, adminOnly, createUser);

router
  .route("/:id")
  .put(protect, adminOnly, updateUser)
  .delete(protect, adminOnly, deleteUser);

export default router;
