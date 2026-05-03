/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

function normalizeItem(item) {
  const stock =
    item.stock != null && item.stock !== "" ? Number(item.stock) : null;
  return {
    product_id: Number(item.product_id),
    name: item.name,
    price: Number(item.price),
    quantity: Number(item.quantity),
    image: item.image || "",
    stock: Number.isFinite(stock) ? stock : null,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  });

  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem("cart", JSON.stringify(nextItems));
  };

  const addItem = (item) => {
    const next = normalizeItem(item);
    const max = next.stock != null && Number.isFinite(next.stock) ? next.stock : Infinity;
    const existing = items.find((x) => x.product_id === next.product_id);
    if (existing) {
      const cap = (q) =>
        max === Infinity ? q : Math.min(max, q);
      persist(
        items.map((x) =>
          x.product_id === next.product_id
            ? {
                ...x,
                quantity: cap(x.quantity + next.quantity),
                stock: next.stock ?? x.stock,
              }
            : x
        )
      );
      return;
    }
    const initialQty = max === Infinity ? next.quantity : Math.min(max, next.quantity);
    persist([{ ...next, quantity: initialQty }, ...items]);
  };

  const clear = () => persist([]);

  const removeItem = (productId) => {
    const id = Number(productId);
    persist(items.filter((x) => x.product_id !== id));
  };

  const setQuantity = (productId, quantity) => {
    const id = Number(productId);
    const row = items.find((x) => x.product_id === id);
    if (!row) return;
    const max =
      row.stock != null && Number.isFinite(Number(row.stock))
        ? Number(row.stock)
        : 999999;
    const q = Math.min(max, Math.max(1, Number(quantity) || 1));
    persist(items.map((x) => (x.product_id === id ? { ...x, quantity: q } : x)));
  };

  const value = { items, addItem, clear, removeItem, setQuantity };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

