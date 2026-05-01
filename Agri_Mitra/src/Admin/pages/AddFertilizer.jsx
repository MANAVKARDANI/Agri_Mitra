import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { productsApi } from "../../services/api";
import { useToast } from "../../context/ToastContext";

export default function AddFertilizer() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [form, setForm] = useState({
    name: "",
    supplier: "",
    price: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let e = {};
    if (!form.name) e.name = "Required";
    if (!form.supplier || form.supplier === "Select a supplier") e.supplier = "Required";
    if (!form.price || Number(form.price) <= 0) e.price = "Invalid";
    if (!form.stock || Number(form.stock) < 0) e.stock = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      showError("Please fill valid product details.");
      return;
    }
    try {
      await productsApi.create({
        name: form.name,
        description: "",
        price: Number(form.price),
        stock: Number(form.stock),
      });
      showSuccess("Fertilizer added successfully.");
      navigate("/admin/inventory");
    } catch {
      showError("Failed to add fertilizer");
    }
  };

  return (
    <div className="p-6 bg-[#f6f8f7] min-h-screen">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Add New Fertilizer
      </h1>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Fill in the details below to register a new product in the Agri-Mitra
        ecosystem.
      </p>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl border p-8 shadow-sm">
        <div className="grid grid-cols-3 gap-8">
          {/* IMAGE */}
          <div className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center h-48 text-gray-400">
            <UploadCloud size={32} />
            <p className="text-sm mt-2">Upload Product Image</p>
            <span className="text-xs">Square (1:1) recommended</span>
          </div>

          {/* FORM */}
          <div className="col-span-2 grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600">Fertilizer Name</label>
              <input
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50"
                placeholder="e.g., Urea Fertilizer"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600">Supplier</label>
              <div className="relative mt-1">
                <select
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 appearance-none"
                  onChange={(e) =>
                    setForm({ ...form, supplier: e.target.value })
                  }
                >
                  <option>Select a supplier</option>
                  <option>Green Agro</option>
                  <option>Organic Hub</option>
                  <option>Chemical Pros</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-3 text-gray-400"
                />
              </div>
              {errors.supplier && (
                <p className="text-red-500 text-xs mt-1">{errors.supplier}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600">Price (INR)</label>
              <input
                type="number"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50"
                placeholder="₹ 0.00"
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Initial Stock Level
              </label>
              <input
                type="number"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50"
                placeholder="e.g., 200"
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
              )}
            </div>
          </div>
        </div>

        {/* STOCK PREVIEW */}
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

        {/* BUTTONS */}
        <div className="flex justify-end items-center gap-6 mt-10">
          <button
            onClick={() => navigate("/admin/inventory")}
            className="text-gray-500 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg shadow-md text-sm"
          >
            + Add Fertilizer
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Recent Additions</h3>
          <span className="text-green-600 text-sm cursor-pointer">
            View All
          </span>
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
