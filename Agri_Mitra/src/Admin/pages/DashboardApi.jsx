import {
  Store,
  FlaskConical,
  Users,
  UserPlus,
  Package,
  ClipboardList,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { dashboardApi } from "../../services/api";

export default function DashboardApi() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    suppliers: 0,
    orders: 0,
    recentSuppliers: [],
    orderTrend: [],
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await dashboardApi.stats();
        setStats({
          users: data.users ?? 0,
          products: data.products ?? 0,
          suppliers: data.suppliers ?? 0,
          orders: data.orders ?? 0,
          recentSuppliers: data.recentSuppliers ?? [],
          orderTrend: data.orderTrend ?? [],
        });
      } catch {
        setStats({
          users: 0,
          products: 0,
          suppliers: 0,
          orders: 0,
          recentSuppliers: [],
          orderTrend: [],
        });
      }
    };
    loadStats();
  }, []);

  const maxTrend = useMemo(() => {
    const counts = (stats.orderTrend || []).map((d) => Number(d.count) || 0);
    const m = Math.max(1, ...counts);
    return m;
  }, [stats.orderTrend]);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-700">
              <Store size={20} />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Total Suppliers</p>
          <h2 className="text-3xl font-bold mt-1">{stats.suppliers}</h2>
          <div className="w-full bg-gray-200 h-2 rounded mt-4">
            <div
              className="bg-green-700 h-2 rounded"
              style={{ width: `${Math.min(100, stats.suppliers * 5)}%` }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-700">
              <FlaskConical size={20} />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Total Fertilizers</p>
          <h2 className="text-3xl font-bold mt-1">{stats.products}</h2>
          <div className="w-full bg-gray-200 h-2 rounded mt-4">
            <div
              className="bg-green-700 h-2 rounded"
              style={{ width: `${Math.min(100, stats.products * 3)}%` }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <Users size={20} />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Total Users</p>
          <h2 className="text-3xl font-bold mt-1">{stats.users}</h2>
          <div className="w-full bg-gray-200 h-2 rounded mt-4">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${Math.min(100, stats.users * 10)}%` }}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <p className="text-gray-500 text-sm mb-6">Efficiently manage your day-to-day operations</p>
        <div className="grid md:grid-cols-4 gap-6">
          <Link
            to="/admin/add-shop"
            className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition"
          >
            <div className="bg-green-100 p-3 w-fit rounded-lg text-green-700 mb-4">
              <UserPlus size={20} />
            </div>
            <h3 className="font-semibold">Add Suppliers</h3>
            <p className="text-sm text-gray-500">Register a new retail partner</p>
          </Link>
          <Link
            to="/admin/inventory"
            className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition"
          >
            <div className="bg-green-100 p-3 w-fit rounded-lg text-green-700 mb-4">
              <Package size={20} />
            </div>
            <h3 className="font-semibold">Manage Fertilizers</h3>
            <p className="text-sm text-gray-500">Update catalog and stock</p>
          </Link>
          <Link
            to="/admin/orders"
            className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition"
          >
            <div className="bg-green-100 p-3 w-fit rounded-lg text-green-700 mb-4">
              <ClipboardList size={20} />
            </div>
            <h3 className="font-semibold">View All Orders</h3>
            <p className="text-sm text-gray-500">Monitor customer orders</p>
          </Link>
          <Link
            to="/admin/users"
            className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition"
          >
            <div className="bg-green-100 p-3 w-fit rounded-lg text-green-700 mb-4">
              <Users size={20} />
            </div>
            <h3 className="font-semibold">View All Users</h3>
            <p className="text-sm text-gray-500">Manage user accounts</p>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-800">Orders per day</h3>
            <span className="text-xs bg-gray-100 px-3 py-1 rounded-md text-gray-600">Last 7 days</span>
          </div>
          <div className="bg-gray-100 rounded-2xl p-8">
            <div className="flex items-end justify-between h-48 gap-2">
              {(stats.orderTrend || []).map((day, i) => {
                const h = maxTrend ? (Number(day.count) / maxTrend) * 100 : 0;
                const barH = Math.max(8, (h / 100) * 160);
                return (
                  <div key={day.date || i} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                    <div
                      className={`w-full max-w-[40px] mx-auto rounded-lg transition-all ${
                        Number(day.count) > 0 ? "bg-green-600" : "bg-green-200"
                      }`}
                      style={{ height: `${barH}px` }}
                      title={`${day.date}: ${day.count} orders`}
                    />
                    <span className="text-[10px] sm:text-xs text-gray-500 font-medium truncate w-full text-center">
                      {day.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-5">Latest Registered Shops</h3>
          <ul className="space-y-5 text-sm">
            {stats.recentSuppliers.map((shop) => (
              <li key={shop.id}>
                <p className="font-semibold">{shop.name}</p>
                <span className="text-gray-500 text-xs">
                  {shop.created_at ? new Date(shop.created_at).toLocaleDateString() : ""} •{" "}
                  {shop.address}
                </span>
              </li>
            ))}
          </ul>
          <Link
            to="/admin/suppliers"
            className="mt-6 block w-full text-center bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded-lg"
          >
            VIEW ALL SHOPS
          </Link>
        </div>
      </div>
    </div>
  );
}
