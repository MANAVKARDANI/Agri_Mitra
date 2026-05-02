import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, loading, updateItem, removeItem, loadCart } = useCart();
  const { showError, showSuccess } = useToast();
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    loadCart().catch(() => showError("Failed to load cart."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedIds((current) => {
      const itemIds = items.map((item) => item.product_id);
      const selectedStillInCart = current.filter((id) => itemIds.includes(id));
      return selectedStillInCart.length ? selectedStillInCart : itemIds;
    });
  }, [items]);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.includes(item.product_id)),
    [items, selectedIds]
  );

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  const allSelected = items.length > 0 && selectedIds.length === items.length;

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : items.map((item) => item.product_id));
  };

  const toggleItem = (productId) => {
    setSelectedIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const changeQuantity = async (item, nextQuantity) => {
    if (nextQuantity < 1 || nextQuantity > Number(item.stock)) return;
    try {
      await updateItem(item.product_id, nextQuantity);
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to update quantity.");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeItem(productId);
      setSelectedIds((current) => current.filter((id) => id !== productId));
      showSuccess("Item removed from cart.");
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to remove item.");
    }
  };

  const handleCheckout = () => {
    if (!selectedItems.length) {
      showError("Select at least one item to checkout.");
      return;
    }
    navigate("/billing", { state: { items: selectedItems } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-500 mt-1">
              Select products, adjust quantities, and checkout when ready.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex justify-center rounded-lg border border-green-700 px-5 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
          >
            Continue Shopping
          </Link>
        </div>

        {loading ? (
          <div className="bg-white border rounded-xl p-8 text-gray-500">Loading cart...</div>
        ) : items.length === 0 ? (
          <div className="bg-white border rounded-xl p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Add products from the shop to see them here.</p>
            <Link
              to="/shop"
              className="inline-flex mt-6 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 accent-green-700"
                  />
                  Select all ({items.length})
                </label>
                <span className="text-sm text-gray-500">{selectedItems.length} selected</span>
              </div>

              <div className="divide-y">
                {items.map((item) => {
                  const selected = selectedIds.includes(item.product_id);
                  return (
                    <div key={item.product_id} className="grid md:grid-cols-[auto_120px_1fr] gap-5 p-5">
                      <div className="flex md:block">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleItem(item.product_id)}
                          className="mt-2 h-4 w-4 accent-green-700"
                        />
                      </div>

                      <div className="h-28 w-28 rounded-lg bg-gray-50 border flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-full w-full object-contain p-3" />
                        ) : (
                          <span className="text-xs text-gray-400">No image</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                          <div>
                            <h2 className="font-semibold text-gray-900">{item.name}</h2>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {item.description || "Agricultural product"}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">Stock: {item.stock}</p>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            Rs. {Number(item.price).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() => changeQuantity(item, Number(item.quantity) - 1)}
                              className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
                              disabled={Number(item.quantity) <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="h-10 min-w-12 px-4 flex items-center justify-center border-x font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => changeQuantity(item, Number(item.quantity) + 1)}
                              className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
                              disabled={Number(item.quantity) >= Number(item.stock)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemove(item.product_id)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="bg-white border rounded-xl shadow-sm p-6 h-fit">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Price Details</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Selected items</span>
                  <span>{selectedItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">GST 5%</span>
                  <span>Rs. {tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-700">Rs. {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-6 w-full rounded-lg bg-yellow-500 py-3 font-semibold text-white hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                disabled={!selectedItems.length}
              >
                Place Order
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
