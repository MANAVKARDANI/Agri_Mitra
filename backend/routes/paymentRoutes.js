import express from "express";
import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-order", authenticate, createRazorpayOrder);
router.post("/verify", authenticate, verifyPayment);

export default router;
