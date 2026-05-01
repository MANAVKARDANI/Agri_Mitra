/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

function readCartStorage() {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    localStorage.removeItem("cart");
    return [];
  }
}

function normalizeItem(item) {
  return {
    product_id: Number(item.product_id),
    name: item.name,
    price: Number(item.price),
    quantity: Number(item.quantity),
    image: item.image || "",
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCartStorage);

  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem("cart", JSON.stringify(nextItems));
  };

  const addItem = (item) => {
    const next = normalizeItem(item);
    const existing = items.find((x) => x.product_id === next.product_id);
    if (existing) {
      persist(
        items.map((x) =>
          x.product_id === next.product_id
            ? { ...x, quantity: x.quantity + next.quantity }
            : x
        )
      );
      return;
    }
    persist([next, ...items]);
  };

  const clear = () => persist([]);

  const value = { items, addItem, clear };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
