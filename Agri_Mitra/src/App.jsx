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
import Cart from "./User/Cart";

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
            <Route path="/cart" element={<Cart />} />
            <Route path="/billing" element={<Billing />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
