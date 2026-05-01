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
    handleValidation,
  ],
  addProduct
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  [
    body("name").optional().trim().notEmpty(),
    body("description").optional().isString(),
    body("image").optional().isString(),
    body("price").optional().isFloat({ min: 0 }),
    body("stock").optional().isInt({ min: 0 }),
    handleValidation,
  ],
  editProduct
);
router.delete("/:id", authenticate, authorize("admin"), removeProduct);

export default router;
