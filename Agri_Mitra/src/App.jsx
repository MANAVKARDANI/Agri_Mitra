import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Auth Pages */
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

/* User Layout */
import MainLayout from "./layout/MainLayout";

/* User Pages */
import Home from "./User/Home";
import Shop from "./User/Shop";
import ShopDetails from "./User/ShopDetails";
import About from "./User/About";
import Contact from "./User/contact";
import UserProfile from "./User/ProfilePage"; // ✅ FIX
import EditProfile from "./User/EditProfile";
import ProductDetails from "./User/ProductDetails";
import Billing from "./User/Billing";
import InfoPage from "./pages/InfoPage";
import NotFoundPage from "./pages/NotFoundPage";

/* Admin Layout */
import AdminLayout from "./Admin/layout/Layout";

/* Admin Pages */
import AdminProfile from "./Admin/pages/admin_profile"; // ✅ FIX
import Dashboard from "./Admin/pages/DashboardApi";
import Suppliers from "./Admin/pages/SuppliersApi";
import Inventory from "./Admin/pages/Inventory";
import Orders from "./Admin/pages/OrdersApi";
import Users from "./Admin/pages/UsersApi";
import AddShop from "./Admin/pages/AddSuppliersApi";
import AddFertilizer from "./Admin/pages/AddFertilizer";
import AddUser from "./Admin/pages/AddUser";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const infoPages = {
    privacy: {
      title: "Privacy Policy",
      description:
        "Agri-Mitra stores only the information required to operate your account, manage orders, and support secure platform access.",
      sections: [
        {
          heading: "Data We Collect",
          body:
            "We collect profile details, authentication data, and order activity needed to deliver platform features and customer support.",
        },
        {
          heading: "How We Use It",
          body:
            "We use your data to authenticate users, manage stock orders, and improve the reliability of our agricultural supply workflows.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      description:
        "These terms describe how Agri-Mitra users access marketplace features, manage inventory, and place fertilizer orders responsibly.",
      sections: [
        {
          heading: "Platform Usage",
          body:
            "Users must provide accurate account information and may only access features that match their assigned platform role.",
        },
        {
          heading: "Order Handling",
          body:
            "Prices, stock availability, and order status are managed by the platform and may be updated when fulfillment conditions change.",
        },
      ],
    },
    cookies: {
      title: "Cookies",
      description:
        "Agri-Mitra uses local browser storage to preserve authentication state, cart selections, and session continuity across visits.",
      sections: [
        {
          heading: "Essential Storage",
          body:
            "We store the minimum browser data required to keep users logged in and retain cart contents between page refreshes.",
        },
        {
          heading: "User Control",
          body:
            "Clearing browser storage will sign you out and remove locally stored cart information from your device.",
        },
      ],
    },
    sitemap: {
      title: "Sitemap",
      description:
        "Use this page as a quick reference for the major routes available across the Agri-Mitra user and admin experiences.",
      sections: [
        {
          heading: "User Routes",
          body:
            "Main user routes include Home, Shop, Shop Details, Product Details, Billing, Profile, Edit Profile, About, and Contact.",
        },
        {
          heading: "Admin Routes",
          body:
            "Administrative routes include Dashboard, Suppliers, Inventory, Orders, Users, Add Shop, Add Fertilizer, and Add User.",
        },
      ],
    },
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* USER */}
        <Route element={<ProtectedRoute roles={["user", "admin"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop-details" element={<ShopDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/billing" element={<Billing />} />
            <Route
              path="/privacy"
              element={<InfoPage {...infoPages.privacy} />}
            />
            <Route path="/terms" element={<InfoPage {...infoPages.terms} />} />
            <Route path="/cookies" element={<InfoPage {...infoPages.cookies} />} />
            <Route path="/sitemap" element={<InfoPage {...infoPages.sitemap} />} />
          </Route>
        </Route>

        {/* ADMIN */}
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="users" element={<Users />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="add-shop" element={<AddShop />} />
            <Route path="add-fertilizer" element={<AddFertilizer />} />
            <Route path="add-user" element={<AddUser />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
