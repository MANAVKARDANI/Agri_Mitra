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
import Contact from "./User/Contact"; // ✅ FIXED
import Profile from "./User/ProfilePage";
import EditProfile from "./User/EditProfile";
import ProductDetails from "./User/ProductDetails";
import Billing from "./User/Billing";

/* Admin Layout */
import AdminLayout from "./Admin/layout/Layout";

/* Admin Pages */
import Dashboard from "./Admin/pages/Dashboard";
import Suppliers from "./Admin/pages/Suppliers";
import Inventory from "./Admin/pages/Inventory";
import Orders from "./Admin/pages/Orders";
import Users from "./Admin/pages/Users";

/* ✅ FIXED IMPORT */
import AddShop from "./Admin/pages/AddSuppliers";
// OR rename file to AddShop.jsx and use:
// import AddShop from "./Admin/pages/AddShop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= AUTH ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ================= USER ================= */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop-details" element={<ShopDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/billing" element={<Billing />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />

          {/* ✅ ADD SHOP PAGE */}
          <Route path="add-shop" element={<AddShop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
