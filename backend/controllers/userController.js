import bcrypt from "bcryptjs";
import {
  deleteUserById,
  listUsers,
  updateUserById,
  findUserById,
  findUserWithPasswordById,
} from "../models/userModel.js";

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
    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({ message: "You can only update your own profile" });
    }

    const { name, email, role, password, currentPassword, avatar } = req.body;

    const payload = {};
    if (name) payload.name = name;
    if (email) payload.email = email;
    if (req.body.avatar !== undefined) payload.avatar = avatar ?? "";
    if (req.user.role === "admin" && role) {
      payload.role = role.toLowerCase() === "admin" ? "admin" : "user";
    }

    if (password) {
      const adminResettingOther = req.user.role === "admin" && req.user.id !== userId;
      if (!adminResettingOther) {
        if (!currentPassword) {
          return res.status(400).json({ message: "Current password is required to set a new password" });
        }
        const fullUser = await findUserWithPasswordById(userId);
        if (!fullUser) return res.status(404).json({ message: "User not found" });
        const match = await bcrypt.compare(currentPassword, fullUser.password);
        if (!match) {
          return res.status(400).json({ message: "Current password is incorrect" });
        }
      }
      payload.password = await bcrypt.hash(password, 10);
    }

    if (!Object.keys(payload).length) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updated = await updateUserById(userId, payload);
    if (!updated) {
      return res.status(404).json({ message: "User not found or nothing to update" });
    }
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user", error: error.message });
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
