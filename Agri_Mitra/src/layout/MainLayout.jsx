import { Link, NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-white text-gray-800">
      {/* NAVBAR */}
      <nav className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <span className="text-green-800 font-bold text-xl tracking-tight">
                AGRI-MITRA
              </span>
            </div>

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

            <div className="flex items-center gap-6 text-gray-600">
              <Link to="/shop">
                <button className="hover:text-green-800 transition">🔍</button>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-green-800 font-bold text-sm"
              >
                <span className="material-symbols-outlined">
                  account_circle
                </span>
                My Account
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <Outlet />

      {/* FOOTER */}
      <footer className="bg-gray-100 border-t border-gray-200 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Brand */}
            <div>
              <h3 className="text-green-800 font-bold text-xl mb-4">
                AGRI-MITRA
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Empowering modern agriculture through technology, accessibility,
                and sustainable practices. Join the future of farming today.
              </p>
            </div>

            {/* Navigation */}
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

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-6">Contact</h4>

              <ul className="space-y-4 text-sm text-gray-500">
                <li>📍 Rajkot, Gujarat 360001</li>
                <li>✉ agrimitra@gmail.com</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 2026 AGRI-MITRA. All rights reserved.</p>

            <div className="flex gap-8 mt-4 md:mt-0">
              <NavLink
                to="/sitemap"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 font-semibold"
                    : "hover:text-green-700"
                }
              >
                Sitemap
              </NavLink>

              <NavLink
                to="/cookies"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 font-semibold"
                    : "hover:text-green-700"
                }
              >
                Cookies
              </NavLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
