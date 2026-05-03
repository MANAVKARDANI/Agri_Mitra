import { useEffect, useRef, useState } from "react";
import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { dashboardApi } from "../../services/api";
import { resolveMediaUrl } from "../../utils/assetUrl";

export default function Navbar() {
  const { user } = useAuth();
  const [lowStock, setLowStock] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await dashboardApi.stats();
        setLowStock(Array.isArray(data?.lowStockProducts) ? data.lowStockProducts : []);
      } catch {
        setLowStock([]);
      }
    };
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (!notifOpen) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [notifOpen]);

  const avatarSrc = resolveMediaUrl(user?.avatar);
  const initials = (user?.name || "A")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center gap-4 flex-wrap">
      <h2 className="font-semibold text-lg">Admin Dashboard Overview</h2>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={16} className="text-gray-400" />
          <input
            className="bg-transparent outline-none ml-2 text-sm w-40 lg:w-56"
            placeholder="Search data..."
            readOnly
          />
        </div>

        <div className="relative" ref={panelRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((o) => !o)}
            className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            aria-label="Stock alerts"
          >
            <Bell size={22} />
            {lowStock.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {lowStock.length > 9 ? "9+" : lowStock.length}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 max-h-80 overflow-y-auto bg-white border rounded-xl shadow-lg z-50 text-sm">
              <div className="px-4 py-3 border-b font-semibold text-gray-800">
                Low stock (&lt; 10 units)
              </div>
              {lowStock.length === 0 ? (
                <p className="px-4 py-6 text-gray-500">All products are sufficiently stocked.</p>
              ) : (
                <ul className="divide-y">
                  {lowStock.map((p) => (
                    <li key={p.id} className="px-4 py-3 flex justify-between gap-2">
                      <span className="text-gray-800 truncate">{p.name}</span>
                      <span className="text-red-600 font-semibold shrink-0">{p.stock} left</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt=""
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-green-200 text-green-800 flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
          )}
          <span className="text-sm font-medium text-gray-800 max-w-[140px] truncate">
            {user?.name || "Admin"}
          </span>
        </div>
      </div>
    </div>
  );
}
