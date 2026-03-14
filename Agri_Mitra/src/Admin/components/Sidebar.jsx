import { Home, Users, Package, ShoppingCart, User } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-5">

      <div className="flex items-center gap-2 mb-10">
        <div className="bg-green-100 p-2 rounded-lg">🌿</div>
        <div>
          <h1 className="font-bold text-green-700">AGRI-MITRA</h1>
          <p className="text-xs text-gray-500">AGRI SOLUTIONS</p>
        </div>
      </div>

      <nav className="space-y-4">

        <div className="flex items-center gap-3 text-green-700 bg-green-100 p-3 rounded-lg">
          <Home size={18} /> Home
        </div>

        <div className="flex items-center gap-3 text-gray-600 p-3 hover:bg-gray-100 rounded-lg">
          <Users size={18}/> Suppliers
        </div>

        <div className="flex items-center gap-3 text-gray-600 p-3 hover:bg-gray-100 rounded-lg">
          <Package size={18}/> Inventory
        </div>

        <div className="flex items-center gap-3 text-gray-600 p-3 hover:bg-gray-100 rounded-lg">
          <ShoppingCart size={18}/> Orders
        </div>

        <div className="flex items-center gap-3 text-gray-600 p-3 hover:bg-gray-100 rounded-lg">
          <Users size={18}/> User Management
        </div>

        <div className="flex items-center gap-3 text-gray-600 p-3 hover:bg-gray-100 rounded-lg">
          <User size={18}/> Profile
        </div>

      </nav>
    </div>
  );
}