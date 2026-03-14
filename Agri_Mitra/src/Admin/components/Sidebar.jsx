import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Package, ShoppingCart, User, Menu } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    {
      name: "Home",
      icon: <Home size={18} />,
      path: "/admin/dashboard",
    },
    {
      name: "Suppliers",
      icon: <Users size={18} />,
      path: "/admin/suppliers",
    },
    {
      name: "Inventory",
      icon: <Package size={18} />,
      path: "/admin/inventory",
    },
    {
      name: "Orders",
      icon: <ShoppingCart size={18} />,
      path: "/admin/orders",
    },
    {
      name: "User Management",
      icon: <Users size={18} />,
      path: "/admin/users",
    },
    {
      name: "Profile",
      icon: <User size={18} />,
      path: "/admin/profile",
    },
  ];

  return (
    <div
      className={`bg-gray-50 border-r min-h-screen transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-5">
        {open && (
          <div className="flex items-center gap-2">
            <div>
              <h1 className="font-semibold text-green-700 text-sm">
                AGRI-MITRA
              </h1>
              <p className="text-xs text-gray-500">AGRI SOLUTIONS</p>
            </div>
          </div>
        )}

        <Menu
          className="cursor-pointer text-gray-500"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Menu */}
      <nav className="mt-6 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between p-3 mx-3 rounded-lg transition-all ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <div className="flex items-center gap-3">
              {item.icon}

              {open && <span className="text-sm font-medium">{item.name}</span>}
            </div>

            {/* Active Indicator */}
            <div className="h-6 w-1 bg-green-700 rounded opacity-0 group-[.active]:opacity-100"></div>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
