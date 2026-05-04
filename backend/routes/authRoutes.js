import express from "express";
import { body } from "express-validator";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    handleValidation,
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidation,
  ],
  login
);

router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Valid email is required"), handleValidation],
  forgotPassword
);

router.post(
  "/reset-password/:token",
  [
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
    handleValidation,
  ],
  resetPassword
);

router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Reset token is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
    handleValidation,
  ],
  resetPassword
);

export default router;
