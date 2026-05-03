import {
  createProduct,
  deleteProductById,
  findProductById,
  listProducts,
  updateProductById,
} from "../models/productModel.js";

export const getProducts = async (_req, res) => {
  try {
    const products = await listProducts();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await findProductById(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description = "",
      price,
      image = "",
      stock,
      supplier_id,
    } = req.body;
    const product = await createProduct({
      name,
      description,
      price: Number(price),
      image,
      stock: Number(stock),
      supplier_id: supplier_id != null && supplier_id !== "" ? Number(supplier_id) : null,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.price !== undefined) payload.price = Number(payload.price);
    if (payload.stock !== undefined) payload.stock = Number(payload.stock);
    if (payload.supplier_id !== undefined) {
      payload.supplier_id =
        payload.supplier_id != null && payload.supplier_id !== ""
          ? Number(payload.supplier_id)
          : null;
    }
    const product = await updateProductById(Number(req.params.id), payload);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const ok = await deleteProductById(Number(req.params.id));
    if (!ok) return res.status(404).json({ message: "Product not found" });
    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};
