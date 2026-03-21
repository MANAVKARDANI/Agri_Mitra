import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Package,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <Home size={18} />, path: "/admin/dashboard" },
    { name: "Suppliers", icon: <Users size={18} />, path: "/admin/suppliers" },
    {
      name: "Inventory",
      icon: <Package size={18} />,
      path: "/admin/inventory",
    },
    { name: "Orders", icon: <ShoppingCart size={18} />, path: "/admin/orders" },
    {
      name: "User Management",
      icon: <Users size={18} />,
      path: "/admin/users",
    },
    { name: "Profile", icon: <User size={18} />, path: "/admin/profile" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-40 bg-white border-r min-h-screen transition-all duration-300 shadow-sm

        ${open ? "w-64" : "w-20"}
        ${mobileOpen ? "left-0" : "-left-64"} lg:left-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          {open && (
            <div>
              <h1 className="font-semibold text-green-700 text-sm tracking-wide">
                AGRI-MITRA
              </h1>
              <p className="text-xs text-gray-500">AGRI SOLUTIONS</p>
            </div>
          )}

          {/* Collapse Button */}
          <Menu
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-gray-500 hover:text-green-600 transition"
          />
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300

                ${
                  isActive
                    ? "bg-green-100 text-green-700 shadow-sm"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }
                `
              }
            >
              {/* Floating Active Indicator */}
              <span className="absolute left-0 top-0 h-full w-1 bg-green-600 rounded-r opacity-0 group-hover:opacity-40 transition-all"></span>

              {/* Icon */}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                {item.icon}
              </span>

              {/* Text */}
              {open && (
                <span className="text-sm font-medium tracking-wide">
                  {item.name}
                </span>
              )}

              {/* Tooltip when collapsed */}
              {!open && (
                <span className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
       
      </div>
    </>
  );
}
