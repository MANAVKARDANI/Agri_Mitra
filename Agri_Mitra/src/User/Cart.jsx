import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { resolveMediaUrl } from "../utils/assetUrl";

export default function Cart() {
  const navigate = useNavigate();
  const { items, setQuantity, removeItem, clear } = useCart();
  const { showSuccess, showInfo } = useToast();

  const subtotal = items.reduce(
    (sum, it) => sum + Number(it.price) * Number(it.quantity),
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!items.length) {
      showInfo("Your cart is empty.");
      return;
    }
    navigate("/billing");
  };

  const cartCount = items.reduce((n, it) => n + Number(it.quantity), 0);

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping cart</h1>
            <p className="text-sm text-gray-500 mt-1">
              {cartCount} item{cartCount === 1 ? "" : "s"} · Review before checkout
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/shop"
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-white"
            >
              Continue shopping
            </Link>
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  clear();
                  showSuccess("Cart cleared.");
                }}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 border border-red-200"
              >
                Clear cart
              </button>
            )}
          </div>
        </div>

        {!items.length ? (
          <div className="bg-white rounded-2xl border shadow-sm p-16 text-center">
            <p className="text-gray-600 mb-6">Your cart is empty.</p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-800"
            >
              Browse shops
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const img = resolveMediaUrl(item.image);
                const max =
                  item.stock != null && Number.isFinite(Number(item.stock))
                    ? Number(item.stock)
                    : null;
                const atMax = max != null && item.quantity >= max;
                return (
                  <div
                    key={item.product_id}
                    className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 flex gap-4 sm:gap-6"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      {img ? (
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">
                          🌾
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <h2 className="font-semibold text-gray-900 truncate">{item.name}</h2>
                        <p className="font-bold text-gray-900 shrink-0">
                          ₹{Number(item.price).toFixed(0)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Product ID: {item.product_id}
                        {max != null ? ` · Max ${max} in stock` : ""}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="inline-flex border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              item.quantity <= 1
                                ? removeItem(item.product_id)
                                : setQuantity(item.product_id, item.quantity - 1)
                            }
                            className="px-3 py-2 text-lg hover:bg-gray-50 text-gray-700"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={atMax}
                            onClick={() => setQuantity(item.product_id, item.quantity + 1)}
                            className="px-3 py-2 text-lg hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            removeItem(item.product_id);
                            showSuccess("Removed from cart.");
                          }}
                          className="text-sm font-semibold text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        Line total:{" "}
                        <span className="font-semibold text-gray-900">
                          ₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Price details</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span className="text-yellow-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-[#111827] text-white py-4 rounded-xl font-semibold hover:bg-black transition"
                >
                  Proceed to checkout
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Secure checkout · You can still edit quantities on the billing page summary
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
