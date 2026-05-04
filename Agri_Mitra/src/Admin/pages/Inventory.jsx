import { useEffect, useMemo, useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  Download,
  Leaf,
  Droplet,
  AlertTriangle,
  Truck,
  Printer,
  Wand2,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { productsApi, suppliersApi, uploadApi } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { resolveMediaUrl } from "../../utils/assetUrl";

const emptyEdit = {
  name: "",
  description: "",
  price: "",
  stock: "",
  supplier_id: "",
  image: "",
};

export default function Fertilizers() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [fertilizers, setFertilizers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(emptyEdit);
  const [uploading, setUploading] = useState(false);

  const loadFertilizers = async () => {
    try {
      const { data } = await productsApi.getAll();
      setFertilizers(data);
    } catch {
      setFertilizers([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFertilizers();
    const loadSup = async () => {
      try {
        const { data } = await suppliersApi.getAll();
        setSuppliers(Array.isArray(data) ? data : []);
      } catch {
        setSuppliers([]);
      }
    };
    loadSup();
  }, []);

  const openEdit = (item) => {
    setEditing(item);
    setEditForm({
      name: item.name || "",
      description: item.description || "",
      price: String(item.price ?? ""),
      stock: String(item.stock ?? ""),
      supplier_id: item.supplier_id != null ? String(item.supplier_id) : "",
      image: item.image || "",
    });
  };

  const closeEdit = () => {
    setEditing(null);
    setEditForm(emptyEdit);
  };

  const saveEdit = async () => {
    if (!editing?.id) return;
    if (!editForm.name?.trim() || !editForm.price || Number(editForm.price) < 0) {
      showError("Valid name and price required.");
      return;
    }
    try {
      let image = editForm.image?.trim() || "";
      const fileInput = document.getElementById("inv-edit-file");
      const file = fileInput?.files?.[0];
      if (file) {
        setUploading(true);
        const { data } = await uploadApi.image(file);
        image = data?.url || image;
        setUploading(false);
        if (fileInput) fileInput.value = "";
      }
      await productsApi.update(editing.id, {
        name: editForm.name.trim(),
        description: editForm.description?.trim() || "",
        price: Number(editForm.price),
        stock: Number(editForm.stock),
        image,
        supplier_id: editForm.supplier_id ? Number(editForm.supplier_id) : null,
      });
      showSuccess("Product updated.");
      closeEdit();
      loadFertilizers();
    } catch {
      setUploading(false);
      showError("Failed to update product.");
    }
  };

  const lowStockCount = useMemo(
    () => fertilizers.filter((item) => Number(item.stock) < 50).length,
    [fertilizers]
  );

  const totalStock = useMemo(
    () => fertilizers.reduce((sum, item) => sum + Number(item.stock || 0), 0),
    [fertilizers]
  );

  const handleDelete = async (id) => {
    try {
      await productsApi.remove(id);
      loadFertilizers();
    } catch {
      showError("Failed to delete fertilizer");
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredFertilizers = useMemo(() => {
    return fertilizers.filter((item) => {
      const s = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(s) ||
        (item.supplier_name && item.supplier_name.toLowerCase().includes(s)) ||
        (item.description && item.description.toLowerCase().includes(s))
      );
    });
  }, [fertilizers, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredFertilizers.length / itemsPerPage));
  const page = Math.min(currentPage, totalPages);
  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredFertilizers.slice(start, start + itemsPerPage);
  }, [filteredFertilizers, page]);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Fertilizers</h1>

          <p className="text-sm text-gray-500">
            Manage and track your agricultural supply stock across all
            suppliers.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-fertilizer")}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm"
        >
          <PlusCircle size={18} />
          Add New Fertilizer
        </button>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-500">Total Stock</p>
            <Leaf className="text-green-600" />
          </div>

          <h2 className="text-2xl font-bold">
            {totalStock} <span className="text-gray-400 text-sm">Units</span>
          </h2>

          <p className="text-green-600 text-xs mt-2">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-500">Low Stock Alert</p>
            <AlertTriangle className="text-yellow-500" />
          </div>

          <h2 className="text-2xl font-bold">
            {lowStockCount} <span className="text-gray-400 text-sm">Items</span>
          </h2>

          <p className="text-xs text-gray-400 mt-2">
            Requires immediate reorder
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-500">Active Suppliers</p>
            <Truck className="text-blue-500" />
          </div>

          <h2 className="text-2xl font-bold">
            {suppliers.length} <span className="text-gray-400 text-sm">Partners</span>
          </h2>

          <p className="text-xs text-gray-400 mt-2">Across all regions</p>
        </div>
      </div>

      {/* SEARCH */}

      <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-3 w-1/2">
          <Search className="text-gray-400" />
          <input
            placeholder="Search fertilizers, brands, or types..."
            className="outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex gap-3">
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          {/* HEADER */}

          <thead className="bg-green-50 text-gray-600 text-xs uppercase border-b">
            <tr>
              <th className="p-4 text-left font-semibold">Fertilizer Name</th>

              <th className="text-left font-semibold">Supplier</th>

              <th className="text-left font-semibold">Price</th>

              <th className="text-left font-semibold">Stock Level</th>

              <th className="text-left font-semibold">Status</th>

              <th className="text-left font-semibold">Actions</th>
            </tr>
          </thead>

          {/* BODY */}

          <tbody>
            {currentItems.map((item) => {
              const stockNum = Number(item.stock || 0);
              const isHigh = stockNum > 150;
              const isModerate = stockNum > 50 && stockNum <= 150;
              const stockColor = isHigh
                ? "bg-green-100 text-green-700"
                : isModerate
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700";
              const statusColor = isHigh
                ? "text-green-600"
                : isModerate
                  ? "text-yellow-600"
                  : "text-red-600";
              const status = isHigh ? "High Stock" : isModerate ? "Moderate" : "Critical";
              return (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                {/* NAME */}

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={resolveMediaUrl(item.image)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : stockNum < 50 ? (
                        <Droplet size={18} className="text-red-500" />
                      ) : (
                        <Leaf size={18} className="text-green-600" />
                      )}
                    </div>

                    <span className="font-medium text-gray-800">{item.name}</span>
                  </div>
                </td>

                {/* SUPPLIER */}

                <td className="text-gray-600">{item.supplier_name || "—"}</td>

                {/* PRICE */}

                <td className="font-semibold text-gray-800">₹{item.price}</td>

                {/* STOCK */}

                <td>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${stockColor}`}
                  >
                    {item.stock} units
                  </span>
                </td>

                {/* STATUS */}

                <td>
                  <div
                    className={`flex items-center gap-2 text-xs font-medium ${statusColor}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current"></span>

                    {status}
                  </div>
                </td>

                {/* ACTIONS */}

                <td>
                  <div className="flex items-center gap-4 text-gray-400">
                    <button
                      type="button"
                      className="hover:text-blue-600 transition"
                      onClick={() => openEdit(item)}
                      aria-label="Edit product"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      className="hover:text-red-600 transition"
                      onClick={() => handleDelete(item.id)}
                      aria-label="Delete product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        {/* PAGINATION */}

        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
          <span>
            Showing {Math.min(filteredFertilizers.length, (page - 1) * itemsPerPage + 1)}-
            {Math.min(filteredFertilizers.length, page * itemsPerPage)} of {filteredFertilizers.length} fertilizers
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
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              type="button"
              onClick={closeEdit}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Edit product</h2>
            <div className="space-y-3 text-sm">
              <label className="block">
                <span className="text-gray-600 text-xs">Image file</span>
                <input id="inv-edit-file" type="file" accept="image/*" className="w-full mt-1 text-xs" />
              </label>
              <input
                value={editForm.image}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Image URL (optional)"
              />
              <input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Name"
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 min-h-[70px]"
                placeholder="Description"
              />
              <select
                value={editForm.supplier_id}
                onChange={(e) => setEditForm({ ...editForm, supplier_id: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">No supplier</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="border rounded-lg px-3 py-2"
                  placeholder="Price"
                />
                <input
                  type="number"
                  value={editForm.stock}
                  onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                  className="border rounded-lg px-3 py-2"
                  placeholder="Stock"
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
                disabled={uploading}
                onClick={saveEdit}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-60"
              >
                {uploading ? "Uploading…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
