import { useState } from "react";
import { Store, MapPin, Phone, Clock, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddShop() {
  const navigate = useNavigate();

  const [shops, setShops] = useState([
    {
      name: "Green Agro",
      location: "India",
      phone: "+91 9870543210",
      hours: "9 AM - 6 PM",
    },
    {
      name: "Organic Hub",
      location: "India",
      phone: "+91 8765432109",
      hours: "10 AM - 7 PM",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
    hours: "",
    address: "",
  });

  const [message, setMessage] = useState(""); // ✅ notification

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddShop = () => {
    if (!form.name || !form.location) {
      setMessage("⚠️ Please fill required fields");
      return;
    }

    setShops([...shops, form]);

    setForm({
      name: "",
      location: "",
      phone: "",
      hours: "",
      address: "",
    });

    setMessage("✅ Shop added successfully!");

    // auto hide message
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="p-8 bg-[#f4f7f6] min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Add New Shop</h1>
        <p className="text-gray-500 text-sm">
          Expand the Fertilizer360 network by adding a new outlet.
        </p>
      </div>

      {/* ✅ NOTIFICATION */}
      {message && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm shadow">
          {message}
        </div>
      )}

      {/* FORM CARD */}
      <div className="bg-white rounded-3xl shadow-sm p-8 max-w-4xl">
        {/* TITLE */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-xl">
            <Store className="text-green-700" size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              Shop Details
            </h2>
            <p className="text-sm text-gray-500">
              Enter the official information for the new fertilizer shop.
            </p>
          </div>
        </div>

        {/* INPUT GRID */}
        <div className="grid grid-cols-2 gap-5">
          <div className="flex items-center bg-gray-100 rounded-xl px-3">
            <Store size={16} className="text-gray-400" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Green Agro"
              className="bg-transparent p-3 w-full outline-none"
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-xl px-3">
            <MapPin size={16} className="text-gray-400" />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Maharashtra, India"
              className="bg-transparent p-3 w-full outline-none"
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-xl px-3">
            <Phone size={16} className="text-gray-400" />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. +91 9870543210"
              className="bg-transparent p-3 w-full outline-none"
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-xl px-3">
            <Clock size={16} className="text-gray-400" />
            <input
              name="hours"
              value={form.hours}
              onChange={handleChange}
              placeholder="e.g. 9 AM - 6 PM"
              className="bg-transparent p-3 w-full outline-none"
            />
          </div>
        </div>

        {/* ADDRESS */}
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter full street address..."
          className="bg-gray-100 p-4 rounded-xl w-full mt-5 outline-none"
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-6">
          {/* ✅ CANCEL REDIRECT */}
          <button
            onClick={() => navigate("/admin/suppliers")}
            className="px-6 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100"
          >
            CANCEL
          </button>

          {/* ✅ ADD + NOTIFICATION */}
          <button
            onClick={handleAddShop}
            className="bg-green-700 text-white px-8 py-2 rounded-xl hover:bg-green-800 shadow"
          >
            ADD SHOP
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-10 bg-white rounded-3xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-6">
          Recently Added Shops
        </h3>

        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b">
            <tr>
              <th className="text-left py-3">SHOP NAME</th>
              <th>LOCATION</th>
              <th>CONTACT NUMBER</th>
              <th>BUSINESS HOURS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {shops.map((shop, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4 flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">🌿</div>
                  <span className="font-medium text-gray-700">{shop.name}</span>
                </td>

                <td className="text-center text-gray-600">{shop.location}</td>
                <td className="text-center text-gray-600">{shop.phone}</td>

                <td className="text-center">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                    {shop.hours}
                  </span>
                </td>

                <td className="text-center">
                  <div className="flex justify-center gap-3">
                    <Pencil
                      size={16}
                      className="text-blue-500 cursor-pointer"
                    />
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
