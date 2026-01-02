import express from "express";
import { protect, adminOnly } from "../middleware/authmiddleware";

const router = express.Router();

router.get("/test", protect, adminOnly, (req, res) => {
  res.json({ message: "Admin API Working " });
});

export default router;
