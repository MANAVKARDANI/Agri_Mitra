import express from "express";
import { body } from "express-validator";
import {
  createManagedUser,
  deleteUser,
  getMe,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.get("/me", authenticate, getMe);
router.get("/", authenticate, authorize("admin"), getUsers);
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").optional().isIn(["admin", "user", "Admin", "User"]),
    body("avatar").optional().isString(),
    handleValidation,
  ],
  createManagedUser
);
router.put(
  "/:id",
  authenticate,
  [
    body("email").optional().isEmail(),
    body("role").optional().isIn(["admin", "user", "Admin", "User"]),
    body("password").optional().isLength({ min: 6 }),
    body("currentPassword").optional().isString(),
    body("avatar").optional().isString(),
    handleValidation,
  ],
  updateUser
);
router.delete("/:id", authenticate, authorize("admin"), deleteUser);

export default router;
