import {
  createOrderWithItems,
  listOrders,
  updateOrderStatusById,
} from "../models/orderModel.js";

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
    return res.status(500).json({ message: "Failed to create order", error: error.message });
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

export const patchOrderStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    console.log(`Updating order ${id} to status: ${status}`);
    
    if (!status || typeof status !== "string") {
      return res.status(400).json({ message: "status is required" });
    }
    
    const order = await updateOrderStatusById(id, status);
    if (!order) {
      console.log(`Order ${id} not found in database during update`);
      return res.status(404).json({ message: "Order not found" });
    }
    
    console.log(`Order ${id} updated successfully`);
    return res.json(order);
  } catch (error) {
    console.error(`Error updating order ${req.params.id}:`, error);
    return res.status(400).json({ message: error.message || "Failed to update order" });
  }
};
