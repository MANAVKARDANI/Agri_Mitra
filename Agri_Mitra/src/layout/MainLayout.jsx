import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { resolveMediaUrl } from "../utils/assetUrl";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((n, it) => n + Number(it.quantity || 0), 0);

  // Pages where logout should appear
  const authPages = ["/profile", "/edit-profile"];
  const showLogout = authPages.includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      {/* ================= NAVBAR ================= */}
      <nav className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <div className="flex items-center gap-2">
              <span className="text-green-800 font-bold text-xl tracking-tight">
                AGRI-MITRA
              </span>
            </div>

            {/* MENU */}
            <div className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-wide">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-800 border-b-2 border-green-800 pb-1"
                    : "text-gray-500 hover:text-green-800 transition"
                }
              >
                HOME
              </NavLink>

              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-800 border-b-2 border-green-800 pb-1"
                    : "text-gray-500 hover:text-green-800 transition"
                }
              >
                SHOP
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-800 border-b-2 border-green-800 pb-1"
                    : "text-gray-500 hover:text-green-800 transition"
                }
              >
                ABOUT
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-800 border-b-2 border-green-800 pb-1"
                    : "text-gray-500 hover:text-green-800 transition"
                }
              >
                CONTACT
              </NavLink>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6 text-gray-600">
              {/* SEARCH */}
              <Link to="/shop">
                <button type="button" className="hover:text-green-800 transition">
                  🔍
                </button>
              </Link>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative flex items-center gap-1 text-sm font-semibold ${
                    isActive ? "text-green-800" : "text-gray-600 hover:text-green-800"
                  }`
                }
              >
                <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 min-w-[1.25rem] h-5 px-1 rounded-full bg-yellow-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </NavLink>

              {/* PROFILE */}
              <Link
                to="/profile"
                className="flex items-center gap-2 text-green-800 font-bold text-sm"
              >
                {resolveMediaUrl(user?.avatar) ? (
                  <img
                    src={resolveMediaUrl(user.avatar)}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border border-green-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-green-200 text-green-800 flex items-center justify-center text-[10px] font-bold">
                    {(user?.name || "U")
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline">My Account</span>
              </Link>

              {/* LOGOUT BUTTON */}
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">
                    logout
                  </span>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-100 border-t border-gray-200 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            {/* BRAND */}
            <div>
              <h3 className="text-green-800 font-bold text-xl mb-4">
                AGRI-MITRA
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Empowering modern agriculture through technology, accessibility,
                and sustainable practices. Join the future of farming today.
              </p>
            </div>

            {/* NAVIGATION */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-6">Navigation</h4>

              <ul className="space-y-4 text-sm">
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-700 font-semibold"
                        : "text-gray-500 hover:text-green-700"
                    }
                  >
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/shop"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-700 font-semibold"
                        : "text-gray-500 hover:text-green-700"
                    }
                  >
                    Shop
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/privacy"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-700 font-semibold"
                        : "text-gray-500 hover:text-green-700"
                    }
                  >
                    Privacy Policy
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/terms"
                    className={({ isActive }) =>
                      isActive
                        ? "text-green-700 font-semibold"
                        : "text-gray-500 hover:text-green-700"
                    }
                  >
                    Terms of Service
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-6">Contact</h4>

              <ul className="space-y-4 text-sm text-gray-500">
                <li>📍 Rajkot, Gujarat 360001</li>
                <li>✉ agrimitra@gmail.com</li>
              </ul>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 2026 AGRI-MITRA. All rights reserved.</p>

            <div className="flex gap-8 mt-4 md:mt-0">
              <NavLink to="/sitemap">Sitemap</NavLink>
              <NavLink to="/cookies">Cookies</NavLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
