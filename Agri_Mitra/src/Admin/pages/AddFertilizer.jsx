import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { productsApi, suppliersApi, uploadApi } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { resolveMediaUrl } from "../../utils/assetUrl";

export default function AddFertilizer() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    supplier: "",
    price: "",
    stock: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await suppliersApi.getAll();
        setSuppliers(Array.isArray(data) ? data : []);
      } catch {
        setSuppliers([]);
      }
    };
    load();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.supplier || form.supplier === "") e.supplier = "Required";
    if (!form.price || Number(form.price) <= 0) e.price = "Invalid";
    if (form.stock === "" || Number(form.stock) < 0) e.stock = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!validate()) {
      showError("Please fill valid product details.");
      return;
    }
    try {
      let image = form.imageUrl.trim();
      if (imageFile) {
        setUploading(true);
        const { data } = await uploadApi.image(imageFile);
        image = data?.url || image;
        setUploading(false);
      }
      await productsApi.create({
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        supplier_id: Number(form.supplier),
        image,
      });
      showSuccess("Fertilizer added successfully.");
      navigate("/admin/inventory");
    } catch {
      setUploading(false);
      showError("Failed to add fertilizer");
    }
  };

  const previewSrc = imagePreview || resolveMediaUrl(form.imageUrl);

  return (
    <div className="p-6 bg-[#f6f8f7] min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800">Add New Fertilizer</h1>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Fill in the details below to register a new product in the Agri-Mitra ecosystem.
      </p>

      <div className="bg-white rounded-2xl border p-8 shadow-sm">
        <div className="grid grid-cols-3 gap-8">
          <label className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center h-48 text-gray-400 cursor-pointer hover:border-green-400 transition overflow-hidden relative">
            {previewSrc ? (
              <img src={previewSrc} alt="" className="w-full h-full object-cover" />
            ) : (
              <>
                <UploadCloud size={32} />
                <p className="text-sm mt-2">Upload Product Image</p>
                <span className="text-xs">Square (1:1) recommended</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          </label>

          <div className="col-span-2 grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="text-sm text-gray-600">Image URL (optional if you upload a file)</label>
              <input
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50"
                placeholder="https://... or leave empty"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Fertilizer Name</label>
              <input
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50"
                placeholder="e.g., Urea Fertilizer"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Supplier</label>
              <div className="relative mt-1">
                <select
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 appearance-none"
                  value={form.supplier}
                  onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                >
                  <option value="">Select a supplier</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
              {errors.supplier && <p className="text-red-500 text-xs mt-1">{errors.supplier}</p>}
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50 min-h-[80px]"
                placeholder="Short description for farmers"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Price (INR)</label>
              <input
                type="number"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50"
                placeholder="₹ 0.00"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-600">Initial Stock Level</label>
              <input
                type="number"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50"
                placeholder="e.g., 200"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs text-gray-400 mb-3">REAL-TIME STOCK PREVIEW</p>

          <div className="flex gap-4">
            <div className="flex-1 border rounded-xl p-4 text-center bg-green-50 border-green-200">
              <div className="w-2 h-2 bg-green-600 rounded-full mx-auto mb-2"></div>
              <p className="text-green-700 text-sm font-semibold">HIGH STOCK</p>
              <p className="text-xs text-gray-400">&gt; 150 units</p>
            </div>

            <div className="flex-1 border rounded-xl p-4 text-center">
              <div className="w-2 h-2 bg-orange-400 rounded-full mx-auto mb-2"></div>
              <p className="text-orange-500 text-sm font-semibold">MODERATE</p>
              <p className="text-xs text-gray-400">50 - 150 units</p>
            </div>

            <div className="flex-1 border rounded-xl p-4 text-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mx-auto mb-2"></div>
              <p className="text-red-500 text-sm font-semibold">CRITICAL</p>
              <p className="text-xs text-gray-400">&lt; 50 units</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-6 mt-10">
          <button
            type="button"
            onClick={() => navigate("/admin/inventory")}
            className="text-gray-500 text-sm"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={uploading}
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-6 py-2 rounded-lg shadow-md text-sm"
          >
            {uploading ? "Uploading…" : "+ Add Fertilizer"}
          </button>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Recent Additions</h3>
          <button
            type="button"
            onClick={() => navigate("/admin/inventory")}
            className="text-green-600 text-sm cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="p-4 text-left">Fertilizer Name</th>
                <th>Supplier</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-4 font-medium">Urea Fertilizer</td>
                <td>Green Agro</td>
                <td className="font-semibold">₹500</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    200 units
                  </span>
                </td>
                <td className="text-green-600">● High Stock</td>
                <td className="flex gap-3 text-gray-400">
                  <Pencil size={16} />
                  <Trash2 size={16} />
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4 font-medium">Organic Compost</td>
                <td>Organic Hub</td>
                <td className="font-semibold">₹800</td>
                <td>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
                    150 units
                  </span>
                </td>
                <td className="text-orange-500">● Moderate</td>
                <td className="flex gap-3 text-gray-400">
                  <Pencil size={16} />
                  <Trash2 size={16} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
