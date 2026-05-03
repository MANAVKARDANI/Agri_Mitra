import express from "express";
import { body } from "express-validator";
import {
  addSupplier,
  editSupplier,
  getSuppliers,
  removeSupplier,
} from "../controllers/supplierController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.get("/", authenticate, getSuppliers);
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("name").trim().notEmpty(),
    body("contact").trim().notEmpty(),
    body("address").trim().notEmpty(),
    body("image").optional().isString(),
    body("area_type").optional().isIn(["city", "town", "village"]),
    body("state").optional().isString(),
    body("district").optional().isString(),
    body("city").optional().isString(),
    body("village").optional().isString(),
    body("business_hours").optional().isString(),
    handleValidation,
  ],
  addSupplier
);
router.put("/:id", authenticate, authorize("admin"), editSupplier);
router.delete("/:id", authenticate, authorize("admin"), removeSupplier);

export default router;
