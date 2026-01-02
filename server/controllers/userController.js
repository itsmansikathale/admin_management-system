import User from "../models/user.js";
import bcrypt from "bcryptjs";

// Read all users (Admin)

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// READ ONE USER
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
};

// CREATE user
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await user.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User Already Exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  res.status(201).json(user);
};

// UPDATE User

export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;

  const updatedUser = await user.save();

  res.json(updatedUser);
};

// DELETE user

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  await user.deleteOne();
  res.json({ message: "User Deleted" });
};
