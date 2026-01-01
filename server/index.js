// Setting up the express server
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import { protect, adminOnly } from "./middleware/authmiddleware.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running..");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "12345") {
    return res.json({
      success: true,

      user: {
        email,
        role: "admin",
      },
      token: "dummy-token",
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

app.get("/api/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// routes
app.use("/api/auth", authRoutes);

// User Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
