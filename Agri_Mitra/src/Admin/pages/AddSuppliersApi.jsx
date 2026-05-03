import { useState } from "react";
import { Store, MapPin, Phone, Clock, Pencil, Trash2, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { suppliersApi, uploadApi } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { resolveMediaUrl } from "../../utils/assetUrl";

export default function AddSuppliersApi() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [shops, setShops] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    hours: "",
    address: "",
    area_type: "city",
    state: "",
    district: "",
    city: "",
    village: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddShop = async () => {
    if (!form.name || !form.phone || !form.address) {
      setMessage("Please fill required fields");
      showError("Please fill required fields.");
      return;
    }
    if (!/^[+\d\s-]{8,}$/.test(form.phone)) {
      setMessage("Please enter valid phone number");
      showError("Please enter valid phone number.");
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
      const { data } = await suppliersApi.create({
        name: form.name.trim(),
        contact: form.phone.trim(),
        address: form.address.trim(),
        image,
        area_type: form.area_type,
        state: form.state.trim(),
        district: form.district.trim(),
        city: form.city.trim(),
        village: form.village.trim(),
        business_hours: form.hours.trim(),
      });
      setShops([data, ...shops]);
      setForm({
        name: "",
        phone: "",
        hours: "",
        address: "",
        area_type: "city",
        state: "",
        district: "",
        city: "",
        village: "",
        imageUrl: "",
      });
      setImageFile(null);
      setImagePreview("");
      setMessage("Shop added successfully");
      showSuccess("Shop added successfully.");
      setTimeout(() => setMessage(""), 2500);
    } catch {
      setUploading(false);
      setMessage("Failed to add shop");
      showError("Failed to add shop.");
    }
  };

  const previewSrc = imagePreview || resolveMediaUrl(form.imageUrl);

  return (
    <div className="p-8 bg-[#f4f7f6] min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Add New Shop</h1>
        <p className="text-gray-500 text-sm">
          Expand the Fertilizer360 network by adding a new outlet with photo and location type.
        </p>
      </div>
      {message && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm shadow">
          {message}
        </div>
      )}
      <div className="bg-white rounded-3xl shadow-sm p-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-xl">
            <Store className="text-green-700" size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-gray-800">Shop Details</h2>
            <p className="text-sm text-gray-500">
              Enter official information — image appears on the public shop directory.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-600 font-medium">Shop image</label>
          <div className="mt-2 flex flex-col sm:flex-row gap-4 items-start">
            <label className="w-40 h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-green-500 overflow-hidden shrink-0">
              {previewSrc ? (
                <img src={previewSrc} alt="" className="w-full h-full object-cover" />
              ) : (
                <>
                  <UploadCloud size={28} />
                  <span className="text-xs mt-1">Upload</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            </label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Or paste image URL (https://...)"
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none min-w-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex items-center bg-gray-100 rounded-xl px-3">
            <Store size={16} className="text-gray-400 shrink-0" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Green Agro"
              className="bg-transparent p-3 w-full outline-none"
            />
          </div>
          <div className="flex items-center bg-gray-100 rounded-xl px-3">
            <MapPin size={16} className="text-gray-400 shrink-0" />
            <select
              name="area_type"
              value={form.area_type}
              onChange={handleChange}
              className="bg-transparent p-3 w-full outline-none text-sm"
            >
              <option value="city">City</option>
              <option value="town">Town</option>
              <option value="village">Village</option>
            </select>
          </div>
          <div className="flex items-center bg-gray-100 rounded-xl px-3">
            <Phone size={16} className="text-gray-400 shrink-0" />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. +91 9870543210"
              className="bg-transparent p-3 w-full outline-none"
            />
          </div>
          <div className="flex items-center bg-gray-100 rounded-xl px-3">
            <Clock size={16} className="text-gray-400 shrink-0" />
            <input
              name="hours"
              value={form.hours}
              onChange={handleChange}
              placeholder="e.g. 9 AM - 6 PM"
              className="bg-transparent p-3 w-full outline-none"
            />
          </div>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State (e.g. Gujarat)"
            className="bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
          />
          <input
            name="district"
            value={form.district}
            onChange={handleChange}
            placeholder="District"
            className="bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City / town name"
            className="bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
          />
          <input
            name="village"
            value={form.village}
            onChange={handleChange}
            placeholder="Village (if applicable)"
            className="bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
          />
        </div>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter full street address..."
          className="bg-gray-100 p-4 rounded-xl w-full mt-5 outline-none min-h-[100px]"
        />
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/suppliers")}
            className="px-6 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100"
          >
            CANCEL
          </button>
          <button
            type="button"
            disabled={uploading}
            onClick={handleAddShop}
            className="bg-green-700 text-white px-8 py-2 rounded-xl hover:bg-green-800 shadow disabled:opacity-60"
          >
            {uploading ? "UPLOADING…" : "ADD SHOP"}
          </button>
        </div>
      </div>
      <div className="mt-10 bg-white rounded-3xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-6">Recently Added Shops</h3>
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b">
            <tr>
              <th className="text-left py-3">SHOP NAME</th>
              <th>AREA</th>
              <th>CONTACT NUMBER</th>
              <th>BUSINESS HOURS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop) => (
              <tr key={shop.id} className="border-b hover:bg-gray-50">
                <td className="py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    {shop.image ? (
                      <img
                        src={resolveMediaUrl(shop.image)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">🌿</div>
                    )}
                  </div>
                  <span className="font-medium text-gray-700">{shop.name}</span>
                </td>
                <td className="text-center text-gray-600 capitalize">{shop.area_type || "—"}</td>
                <td className="text-center text-gray-600">{shop.contact}</td>
                <td className="text-center">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                    {shop.business_hours || "—"}
                  </span>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-3">
                    <Pencil size={16} className="text-blue-500 cursor-pointer" />
                    <Trash2 size={16} className="text-red-500 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
