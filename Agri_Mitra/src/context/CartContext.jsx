/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { cartApi } from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      return [];
    }
    setLoading(true);
    try {
      const { data } = await cartApi.get();
      setItems(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const addItem = async ({ product_id, quantity }) => {
    const { data } = await cartApi.add({
      product_id: Number(product_id),
      quantity: Number(quantity),
    });
    setItems(data);
    return data;
  };

  const updateItem = async (productId, quantity) => {
    const { data } = await cartApi.update(productId, { quantity: Number(quantity) });
    setItems(data);
    return data;
  };

  const removeItem = async (productId) => {
    const { data } = await cartApi.remove(productId);
    setItems(data);
    return data;
  };

  const clear = async (productIds) => {
    const payload = Array.isArray(productIds) && productIds.length
      ? { product_ids: productIds }
      : {};
    const { data } = await cartApi.clear(payload);
    setItems(data);
    return data;
  };

  useEffect(() => {
    loadCart().catch(() => setItems([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.id]);

  const count = items.reduce((sum, item) => sum + Number(item.quantity), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
  const value = {
    items,
    count,
    subtotal,
    loading,
    addItem,
    updateItem,
    removeItem,
    clear,
    loadCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
