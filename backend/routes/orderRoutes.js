import express from "express";
import { body } from "express-validator";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { authenticate } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  [
    body("status").optional().isIn(["pending", "completed", "cancelled"]),
    body("items").isArray({ min: 1 }).withMessage("Order items are required"),
    body("items.*.product_id").isInt({ min: 1 }).withMessage("Valid product id is required"),
    body("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("items.*.price").optional().isFloat({ min: 0 }),
    handleValidation,
  ],
  createOrder
);
router.get("/", authenticate, getOrders);

export default router;
