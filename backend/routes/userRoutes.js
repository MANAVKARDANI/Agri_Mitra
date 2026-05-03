import express from "express";
import { body } from "express-validator";
import { deleteUser, getMe, getUsers, updateUser } from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.get("/me", authenticate, getMe);
router.get("/", authenticate, authorize("admin"), getUsers);
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
