import express from "express";
import { createOrder, getOrders, patchOrderStatus } from "../controllers/orderController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getOrders);

// Re-implemented to ensure no hidden character or route issues
router.put("/:id", authenticate, authorize("admin"), patchOrderStatus);
router.patch("/:id", authenticate, authorize("admin"), patchOrderStatus);

export default router;
