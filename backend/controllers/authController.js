import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  createUser,
  findUserByEmail,
  findUserByResetTokenHash,
  setPasswordResetToken,
  updatePasswordAndClearReset,
} from "../models/userModel.js";
import { getTransporter } from "../config/mailer.js";

const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    const normalizedRole = role.toLowerCase() === "admin" ? "admin" : "user";

    const exists = await findUserByEmail(email);
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
    });

    const token = signToken(user);
    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        created_at: user.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || "",
      created_at: user.created_at,
    };

    return res.json({ token, user: safeUser });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    // Always return generic success to prevent account enumeration.
    if (!user) {
      return res.json({ message: "If this email exists, a reset link has been sent." });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 min

    await setPasswordResetToken({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5174";
    const resetLink = `${frontendUrl}/forgot-password?token=${rawToken}`;

    const transporter = await getTransporter();
    const from = process.env.MAIL_FROM || "no-reply@agrimitra.local";
    const info = await transporter.sendMail({
      from,
      to: email,
      subject: "Agri Mitra Password Reset",
      text: `Reset your password using this link: ${resetLink}`,
      html: `
        <p>You requested a password reset for Agri Mitra.</p>
        <p><a href="${resetLink}">Click here to reset your password</a></p>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    return res.json({
      message: "If this email exists, a reset link has been sent.",
      preview: info.message?.toString() || null,
      resetLink,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send reset email", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await findUserByResetTokenHash(tokenHash);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updatePasswordAndClearReset({ userId: user.id, hashedPassword });

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
};
