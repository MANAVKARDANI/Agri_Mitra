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
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { suppliersApi } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { resolveMediaUrl } from "../../utils/assetUrl";

const emptyForm = {
  name: "",
  contact: "",
  address: "",
  image: "",
  area_type: "city",
  state: "",
  district: "",
  city: "",
  village: "",
  business_hours: "",
};

export default function SuppliersApi() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [shops, setShops] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadSuppliers = async () => {
    try {
      const { data } = await suppliersApi.getAll();
      setShops(Array.isArray(data) ? data : []);
    } catch {
      setShops([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSuppliers();
  }, []);

  const openEdit = (shop) => {
    setEditing(shop);
    setForm({
      name: shop.name || "",
      contact: shop.contact || "",
      address: shop.address || "",
      image: shop.image || "",
      area_type: shop.area_type || "city",
      state: shop.state || "",
      district: shop.district || "",
      city: shop.city || "",
      village: shop.village || "",
      business_hours: shop.business_hours || "",
    });
  };

  const closeEdit = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const saveEdit = async () => {
    if (!editing?.id) return;
    if (!form.name?.trim() || !form.contact?.trim() || !form.address?.trim()) {
      showError("Name, contact, and address are required.");
      return;
    }
    try {
      await suppliersApi.update(editing.id, {
        name: form.name.trim(),
        contact: form.contact.trim(),
        address: form.address.trim(),
        image: form.image?.trim() || "",
        area_type: form.area_type,
        state: form.state?.trim() || "",
        district: form.district?.trim() || "",
        city: form.city?.trim() || "",
        village: form.village?.trim() || "",
        business_hours: form.business_hours?.trim() || "",
      });
      showSuccess("Shop updated.");
      closeEdit();
      loadSuppliers();
    } catch {
      showError("Failed to update shop.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await suppliersApi.remove(id);
      loadSuppliers();
    } catch {
      showError("Failed to delete shop");
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredShops = useMemo(() => {
    return shops.filter((s) => {
      const q = searchTerm.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        (s.address && s.address.toLowerCase().includes(q)) ||
        (s.state && s.state.toLowerCase().includes(q)) ||
        (s.district && s.district.toLowerCase().includes(q))
      );
    });
  }, [shops, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredShops.length / itemsPerPage));
  const page = Math.min(currentPage, totalPages);
  const currentShops = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredShops.slice(start, start + itemsPerPage);
  }, [filteredShops, page]);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Shops</h1>
          <p className="text-sm text-gray-500">
            Register and monitor fertilizer distribution centers. Edit from the pencil icon.
          </p>
        </div>
        <button
          type="button"
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

      <div className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm flex-wrap gap-3">
        <div className="flex items-center gap-2 w-full sm:w-1/2 min-w-[200px]">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            placeholder="Search shops by name, location..."
            className="outline-none text-sm w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
          >
            <Filter size={16} />
            Filter
          </button>
          <button
            type="button"
            className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
          >
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
            {currentShops.map((shop, index) => (
              <tr key={shop.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-green-100 shrink-0 flex items-center justify-center">
                      {shop.image ? (
                        <img
                          src={resolveMediaUrl(shop.image)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : index % 2 ? (
                        <Truck size={18} className="text-green-700" />
                      ) : (
                        <Leaf size={18} className="text-green-700" />
                      )}
                    </div>
                    <span className="font-medium">{shop.name}</span>
                  </div>
                </td>
                <td className="text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="shrink-0" />
                    <span className="line-clamp-2">{shop.address}</span>
                  </div>
                </td>
                <td className="text-gray-700">{shop.contact}</td>
                <td>
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs">
                    {shop.business_hours || "—"}
                  </span>
                </td>
                <td>
                  <div className="flex gap-3 text-gray-500">
                    <button
                      type="button"
                      className="hover:text-blue-600"
                      onClick={() => openEdit(shop)}
                      aria-label="Edit shop"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      className="hover:text-red-600"
                      onClick={() => handleDelete(shop.id)}
                      aria-label="Delete shop"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
          <span>
            Showing {Math.min(filteredShops.length, (page - 1) * itemsPerPage + 1)}-
            {Math.min(filteredShops.length, page * itemsPerPage)} of {filteredShops.length} shops
          </span>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded transition ${
                  page === i + 1 ? "bg-green-700 text-white" : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            )).slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))}
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              type="button"
              onClick={closeEdit}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Edit shop</h2>
            <div className="space-y-3 text-sm">
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Shop name"
              />
              <input
                name="contact"
                value={form.contact}
                onChange={handleFormChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Contact / phone"
              />
              <textarea
                name="address"
                value={form.address}
                onChange={handleFormChange}
                className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
                placeholder="Address"
              />
              <input
                name="image"
                value={form.image}
                onChange={handleFormChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Image URL or /uploads/..."
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  name="area_type"
                  value={form.area_type}
                  onChange={handleFormChange}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="city">City</option>
                  <option value="town">Town</option>
                  <option value="village">Village</option>
                </select>
                <input
                  name="business_hours"
                  value={form.business_hours}
                  onChange={handleFormChange}
                  className="border rounded-lg px-3 py-2"
                  placeholder="Hours"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="state"
                  value={form.state}
                  onChange={handleFormChange}
                  className="border rounded-lg px-3 py-2"
                  placeholder="State"
                />
                <input
                  name="district"
                  value={form.district}
                  onChange={handleFormChange}
                  className="border rounded-lg px-3 py-2"
                  placeholder="District"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="city"
                  value={form.city}
                  onChange={handleFormChange}
                  className="border rounded-lg px-3 py-2"
                  placeholder="City"
                />
                <input
                  name="village"
                  value={form.village}
                  onChange={handleFormChange}
                  className="border rounded-lg px-3 py-2"
                  placeholder="Village"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={closeEdit}
                className="px-4 py-2 border rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
