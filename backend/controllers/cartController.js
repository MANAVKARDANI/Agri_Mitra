import {
  addCartItem,
  clearCartItems,
  listCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "../models/cartModel.js";

export const getCart = async (req, res) => {
  try {
    const items = await listCartItems(req.user.id);
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    await addCartItem({
      userId: req.user.id,
      productId: Number(req.body.product_id),
      quantity: Number(req.body.quantity),
    });
    const items = await listCartItems(req.user.id);
    return res.status(201).json(items);
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Failed to add item to cart" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const updated = await updateCartItemQuantity({
      userId: req.user.id,
      productId: Number(req.params.productId),
      quantity: Number(req.body.quantity),
    });
    if (!updated) return res.status(404).json({ message: "Cart item not found" });

    const items = await listCartItems(req.user.id);
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update cart item", error: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    await removeCartItem({
      userId: req.user.id,
      productId: Number(req.params.productId),
    });
    const items = await listCartItems(req.user.id);
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: "Failed to remove cart item", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await clearCartItems({
      userId: req.user.id,
      productIds: req.body?.product_ids?.map(Number),
    });
    const items = await listCartItems(req.user.id);
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: "Failed to clear cart", error: error.message });
  }
};
