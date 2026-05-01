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
    const { name, description = "", price, image = "", stock } = req.body;
    const product = await createProduct({
      name,
      description,
      price: Number(price),
      image,
      stock: Number(stock),
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const payload = {};
    if (req.body.name !== undefined) payload.name = req.body.name;
    if (req.body.description !== undefined) payload.description = req.body.description;
    if (req.body.image !== undefined) payload.image = req.body.image;
    if (req.body.price !== undefined) payload.price = Number(req.body.price);
    if (req.body.stock !== undefined) payload.stock = Number(req.body.stock);
    if (!Object.keys(payload).length) {
      return res.status(400).json({ message: "No valid product fields provided" });
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
