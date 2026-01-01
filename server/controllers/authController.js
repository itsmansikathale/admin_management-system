import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ mesage: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.mesage });
  }
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailTrimmed = email.trim().toLowerCase();

  if (!validator.isEmail(emailTrimmed)) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  res.status(200).json({
    message: "Login Successfull",
  });
};
