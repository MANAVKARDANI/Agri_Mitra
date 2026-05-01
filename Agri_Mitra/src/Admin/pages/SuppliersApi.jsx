import {
  Plus,
  Store,
  Map,
  ShieldCheck,
  Search,
  Filter,
  Download,
  MapPin,
  Pencil,
  Trash2,
  Truck,
  Leaf,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { suppliersApi } from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function SuppliersApi() {
  const navigate = useNavigate();
  const { showError } = useToast();
  const [shops, setShops] = useState([]);

  const loadSuppliers = async () => {
    try {
      const { data } = await suppliersApi.getAll();
      setShops(data);
    } catch {
      setShops([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSuppliers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await suppliersApi.remove(id);
      loadSuppliers();
    } catch {
      showError("Failed to delete shop");
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Shops</h1>
          <p className="text-sm text-gray-500">
            Register and monitor fertilizer distribution centers across regions.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/add-shop")}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm shadow"
        >
          <Plus size={16} />
          Add New Shop
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6 flex items-center gap-4 shadow-sm">
          <div className="bg-green-100 p-3 rounded-lg text-green-700">
            <Store size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">TOTAL SHOPS</p>
            <h2 className="text-xl font-bold">{shops.length}</h2>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 flex items-center gap-4 shadow-sm">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <Map size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">ACTIVE REGIONS</p>
            <h2 className="text-xl font-bold">{shops.length}</h2>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 flex items-center gap-4 shadow-sm">
          <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">VERIFIED PARTNERS</p>
            <h2 className="text-xl font-bold">{shops.length}</h2>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 w-1/2">
          <Search size={16} className="text-gray-400" />
          <input placeholder="Search shops by name, location..." className="outline-none text-sm w-full" />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm hover:bg-gray-100">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm hover:bg-gray-100">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="p-4 text-left">Shop Name</th>
              <th className="text-left">Location</th>
              <th className="text-left">Contact Number</th>
              <th className="text-left">Business Hours</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop, index) => (
              <tr key={shop.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      {index % 2 ? <Truck size={18} className="text-green-700" /> : <Leaf size={18} className="text-green-700" />}
                    </div>
                    <span className="font-medium">{shop.name}</span>
                  </div>
                </td>
                <td className="text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {shop.address}
                  </div>
                </td>
                <td className="text-gray-700">{shop.contact}</td>
                <td>
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs">9 AM - 6 PM</span>
                </td>
                <td>
                  <div className="flex gap-3 text-gray-500">
                    <button className="hover:text-blue-600">
                      <Pencil size={16} />
                    </button>
                    <button className="hover:text-red-600" onClick={() => handleDelete(shop.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
          <span>SHOWING 1-{shops.length} OF {shops.length} SHOPS</span>
          <div className="flex gap-2 items-center">
            <button className="px-3 py-1 border rounded">{"<"}</button>
            <button className="px-3 py-1 bg-green-700 text-white rounded">1</button>
            <button className="px-3 py-1 border rounded">{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
