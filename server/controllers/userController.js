import user from "../models/user.js";
import bcrypt from "bcryptjs";

// GET all users (Admin)

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
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
  user.role = req.body.role || user.role;

  await user.save();
  res.json(user);
};

// DELETE user

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User Deleted" });
};
