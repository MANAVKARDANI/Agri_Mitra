import { Download, Filter, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { ordersApi } from "../../services/api";

export default function OrdersApi() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await ordersApi.getAll();
        setOrders(data);
      } catch {
        setOrders([]);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 ">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-500">
            Manage and track all customer fertilizer orders in one place.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
            <Download size={16} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-green-50 text-green-700 text-xs uppercase">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Shop</th>
              <th className="text-left">Product</th>
              <th className="text-left">Price</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-4 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-semibold">
                    {order.user_name?.slice(0, 2).toUpperCase()}
                  </div>
                  {order.user_name}
                </td>
                <td className="text-gray-700">Agri Shop</td>
                <td className="text-gray-700">
                  {order.items?.[0]?.product_name || "—"}
                </td>
                <td className="font-semibold">₹{order.total_amount}</td>
                <td>{order.items?.[0]?.quantity || "—"}</td>
                <td>
                  {order.status === "completed" ? (
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">● Collected</span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">● Not Collected</span>
                  )}
                </td>
                <td>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
          Showing {orders.length} orders
          <div className="flex gap-2 items-center">
            <button className="px-3 py-1 bg-green-700 text-white rounded">1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
