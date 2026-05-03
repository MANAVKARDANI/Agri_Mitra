import express from "express";
import { body } from "express-validator";
import {
  addProduct,
  editProduct,
  getProductById,
  getProducts,
  removeProduct,
} from "../controllers/productController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validate.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  authenticate,
  authorize("admin"),
  [
    body("name").trim().notEmpty(),
    body("price").isFloat({ min: 0 }),
    body("stock").isInt({ min: 0 }),
    body("description").optional().isString(),
    body("image").optional().isString(),
    body("supplier_id").optional().isInt(),
    handleValidation,
  ],
  addProduct
);
router.put("/:id", authenticate, authorize("admin"), editProduct);
router.delete("/:id", authenticate, authorize("admin"), removeProduct);

export default router;
