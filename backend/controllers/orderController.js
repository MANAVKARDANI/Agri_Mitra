import { createOrderWithItems, listOrders } from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { items, status } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const order = await createOrderWithItems({ userId, status, items });
    return res.status(201).json(order);
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Failed to create order" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await listOrders({ user: req.user });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};
