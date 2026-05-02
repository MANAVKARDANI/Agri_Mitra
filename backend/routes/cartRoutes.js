import express from "express";
import { body, param } from "express-validator";
import {
  addToCart,
  clearCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../controllers/cartController.js";
import { authenticate } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getCart);

router.post(
  "/items",
  [
    body("product_id").isInt({ min: 1 }).withMessage("Valid product id is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    handleValidation,
  ],
  addToCart
);

router.put(
  "/items/:productId",
  [
    param("productId").isInt({ min: 1 }).withMessage("Valid product id is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    handleValidation,
  ],
  updateCartItem
);

router.delete(
  "/items/:productId",
  [param("productId").isInt({ min: 1 }), handleValidation],
  deleteCartItem
);

router.delete("/", clearCart);

export default router;
