import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ordersApi } from "../services/api";
import { resolveMediaUrl } from "../utils/assetUrl";

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return String(iso);
  }
}

export default function Profile() {
  const { user } = useAuth();
  const userName = user?.name || "User";
  const userEmail = user?.email || "user@email.com";
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await ordersApi.getAll();
        setOrders(Array.isArray(data) ? data : []);
        setLoadError("");
      } catch {
        setOrders([]);
        setLoadError("Could not load orders.");
      }
    };
    load();
  }, []);

  return (
    <div className="bg-[#f7f7f7] min-h-screen flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-[520px] p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            {resolveMediaUrl(user?.avatar) ? (
              <img
                src={resolveMediaUrl(user.avatar)}
                alt=""
                className="w-24 h-24 rounded-full object-cover border-2 border-green-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-green-900 font-bold text-2xl">
                {userName
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-4">{userName}</h2>

          <p className="text-gray-500 text-sm">{userEmail}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-600 font-medium">Full Name</label>

            <input
              type="text"
              value={userName}
              disabled
              className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Email Address</label>

            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="material-symbols-outlined text-green-700">check_circle</span>

            <p className="text-sm text-gray-700">Password protected account</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Link to="/edit-profile" className="flex-1">
              <button
                type="button"
                className="w-full bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg shadow-md font-semibold transition"
              >
                Edit Profile
              </button>
            </Link>

            <button
              type="button"
              onClick={() => setShowHistory((v) => !v)}
              className="flex-1 border border-green-700 text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              {showHistory ? "Hide order history" : "Order history"}
            </button>
          </div>

          {showHistory && (
            <div className="border-t pt-6 space-y-4 max-h-80 overflow-y-auto">
              {loadError && <p className="text-sm text-red-600">{loadError}</p>}
              {!orders.length && !loadError && (
                <p className="text-sm text-gray-500">No orders yet.</p>
              )}
              {orders.map((o) => (
                <div key={o.id} className="rounded-xl border border-gray-100 p-4 text-sm bg-gray-50">
                  <div className="flex justify-between font-semibold text-gray-800">
                    <span>Order #{o.id}</span>
                    <span className="text-yellow-700">₹{Number(o.total_amount).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(o.created_at)}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-600 capitalize">Status: {o.status}</p>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">
                        {o.payment_method || "Cash"}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                          o.payment_status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {o.payment_status || "Pending"}
                      </span>
                    </div>
                  </div>

                  {Array.isArray(o.items) && o.items.length > 0 && (
                    <ul className="mt-2 text-xs text-gray-600 space-y-1">
                      {o.items.map((it) => (
                        <li key={it.id || `${it.product_id}-${it.quantity}`}>
                          {it.product_name || `Product #${it.product_id}`} × {it.quantity} @ ₹
                          {Number(it.price).toFixed(0)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
