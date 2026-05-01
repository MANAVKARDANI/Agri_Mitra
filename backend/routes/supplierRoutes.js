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
    handleValidation,
  ],
  addSupplier
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  [
    body("name").optional().trim().notEmpty(),
    body("contact").optional().trim().notEmpty(),
    body("address").optional().trim().notEmpty(),
    handleValidation,
  ],
  editSupplier
);
router.delete("/:id", authenticate, authorize("admin"), removeSupplier);

export default router;
