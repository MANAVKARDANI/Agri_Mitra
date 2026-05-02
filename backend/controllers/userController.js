import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import {
  createUser,
  findUserByEmail,
  deleteUserById,
  listUsers,
  updateUserById,
  findUserById,
  findUserWithPasswordById,
} from "../models/userModel.js";

const getImageUrl = (file) => {
  if (!file) return null;
  const uploadsIndex = file.destination.indexOf("uploads");
  if (uploadsIndex === -1) return null;
  const relativePath = file.destination.substring(uploadsIndex);
  return `/${relativePath}/${file.filename}`.replace(/\\/g, "/");
};

export const getUsers = async (_req, res) => {
  try {
    const users = await listUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { name, email, role, password, currentPassword } = req.body;
    const isAdmin = req.user.role === "admin";
    const isSelf = req.user.id === userId;

    if (!isAdmin && !isSelf) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!isAdmin && role) {
      return res.status(403).json({ message: "Only admins can change roles" });
    }

    const payload = {};
    if (name) payload.name = name;
    if (email) payload.email = email;
    if (role && isAdmin) payload.role = role.toLowerCase() === "admin" ? "admin" : "user";
    if (password) {
      if (isSelf) {
        if (!currentPassword) {
          return res.status(400).json({ message: "Current password is required" });
        }

        const existingUser = await findUserWithPasswordById(userId);
        const isPasswordValid = existingUser
          ? await bcrypt.compare(currentPassword, existingUser.password)
          : false;

        if (!isPasswordValid) {
          return res.status(401).json({ message: "Current password is incorrect" });
        }
      }

      payload.password = await bcrypt.hash(password, 10);
    }
    if (req.file) {
      payload.profileImage = getImageUrl(req.file);
    }
    if (!Object.keys(payload).length) {
      return res.status(400).json({ message: "No valid user fields provided" });
    }

    const updated = await updateUserById(userId, payload);
    if (!updated) {
      return res.status(404).json({ message: "User not found or nothing to update" });
    }
    return res.json(updated);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email already registered" });
    }
    return res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

export const createManagedUser = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    const normalizedRole = role.toLowerCase() === "admin" ? "admin" : "user";

    const exists = await findUserByEmail(email);
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profileImage = req.file ? getImageUrl(req.file) : null;
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
      profileImage,
    });

    return res.status(201).json(user);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email already registered" });
    }
    return res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load profile", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const ok = await deleteUserById(Number(req.params.id));
    if (!ok) return res.status(404).json({ message: "User not found" });
    return res.json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};
