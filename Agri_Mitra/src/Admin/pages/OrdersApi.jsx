import { Download, Filter, ChevronDown, ChevronRight } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { ordersApi } from "../../services/api";
import { useToast } from "../../context/ToastContext";

function parseItems(order) {
  const raw = order?.items;
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export default function OrdersApi() {
  const { showError, showSuccess } = useToast();
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await ordersApi.getAll();
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setOrders([]);
      }
    };
    loadOrders();
  }, []);

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = orders.filter((o) => {
    const q = searchTerm.toLowerCase();
    return (
      String(o.id).includes(q) ||
      (o.user_name && o.user_name.toLowerCase().includes(q)) ||
      (o.user_email && o.user_email.toLowerCase().includes(q)) ||
      (o.status && o.status.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));
  const page = Math.min(currentPage, totalPages);
  const currentOrders = filteredOrders.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-500">
            Manage and track all customer fertilizer orders. Expand a row for full line items.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input
              placeholder="Search orders..."
              className="pl-8 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-green-50 text-green-700 text-xs uppercase">
            <tr>
              <th className="p-4 text-left w-10"></th>
              <th className="p-4 text-left">Date</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Order</th>
              <th className="text-left">Items</th>
              <th className="text-left">Total</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => {
              const items = parseItems(order);
              const itemCount = items.length;
              const summary =
                itemCount === 0
                  ? "—"
                  : itemCount === 1
                    ? items[0]?.product_name || "1 item"
                    : `${itemCount} products`;
              const isOpen = expandedId === order.id;
              return (
                <Fragment key={order.id}>
                  <tr className="border-t hover:bg-gray-50">
                    <td className="p-4 align-middle">
                      <button
                        type="button"
                        onClick={() => toggle(order.id)}
                        className="p-1 rounded hover:bg-gray-200 text-gray-600"
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Collapse order" : "Expand order"}
                      >
                        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </button>
                    </td>
                    <td className="p-4 text-gray-600 whitespace-nowrap">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleString()
                        : "—"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-semibold shrink-0">
                          {order.user_name?.slice(0, 2).toUpperCase() || "?"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 truncate">{order.user_name}</p>
                          <p className="text-xs text-gray-500 truncate">{order.user_email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-800 font-mono">#{order.id}</td>
                    <td className="p-4 text-gray-700 max-w-[200px]">
                      <span className="line-clamp-2">{summary}</span>
                    </td>
                    <td className="p-4 font-semibold whitespace-nowrap">
                      ₹{Number(order.total_amount).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status || "pending"}
                        onChange={async (e) => {
                          const v = e.target.value;
                          try {
                            await ordersApi.updateStatus(order.id, v);
                            setOrders((prev) =>
                              prev.map((o) => (o.id === order.id ? { ...o, status: v } : o))
                            );
                            showSuccess("Order status updated.");
                          } catch (err) {
                            showError(err?.response?.data?.message || "Failed to update status");
                          }
                        }}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white capitalize"
                      >
                        <option value="pending">pending</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-gray-50 border-t border-gray-100">
                      <td colSpan={7} className="p-0">
                        <div className="p-6">
                          <h3 className="text-sm font-bold text-gray-800 mb-3">
                            Order #{order.id} — line items
                          </h3>
                          {items.length === 0 ? (
                            <p className="text-sm text-gray-500">No line items returned.</p>
                          ) : (
                            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                                  <tr>
                                    <th className="text-left p-3">Product</th>
                                    <th className="text-left p-3">Product ID</th>
                                    <th className="text-right p-3">Unit price</th>
                                    <th className="text-right p-3">Qty</th>
                                    <th className="text-right p-3">Line total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {items.map((it) => {
                                    const line = Number(it.price) * Number(it.quantity);
                                    return (
                                      <tr key={it.id ?? `${it.product_id}-${it.quantity}`} className="border-t">
                                        <td className="p-3 font-medium text-gray-800">
                                          {it.product_name || `Product #${it.product_id}`}
                                        </td>
                                        <td className="p-3 text-gray-600 font-mono">{it.product_id}</td>
                                        <td className="p-3 text-right">₹{Number(it.price).toFixed(2)}</td>
                                        <td className="p-3 text-right">{it.quantity}</td>
                                        <td className="p-3 text-right font-semibold">
                                          ₹{line.toFixed(2)}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                                <tfoot className="bg-gray-50 text-gray-800 font-semibold">
                                  <tr>
                                    <td colSpan={4} className="p-3 text-right">
                                      Order total
                                    </td>
                                    <td className="p-3 text-right">
                                      ₹{Number(order.total_amount).toFixed(2)}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-4 text-sm text-gray-500 border-t">
          <span>
            Showing {Math.min(filteredOrders.length, (page - 1) * itemsPerPage + 1)}-
            {Math.min(filteredOrders.length, page * itemsPerPage)} of {filteredOrders.length} orders
          </span>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded transition ${
                  page === i + 1 ? "bg-green-700 text-white" : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            )).slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))}
          </div>
        </div>
      </div>
    </div>
  );
}
