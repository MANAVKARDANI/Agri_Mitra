import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, User, ShieldCheck, Shield } from "lucide-react";

export default function AddUser({ addUser }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "USER",
    password: "",
    notify: true,
  });

  const [errors, setErrors] = useState({});

  // ✅ LIVE VALIDATION
  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && !value) error = "Full name is required";
    if (name === "email" && !value) error = "Email is required";
    if (name === "password" && !value) error = "Password is required";

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    validateField(field, value); // 🔥 live validation
  };

  const validate = () => {
    let e = {};
    if (!form.name) e.name = "Required";
    if (!form.email) e.email = "Required";
    if (!form.password) e.password = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newUser = {
      id: Date.now().toString().slice(-3),
      name: form.name,
      email: form.email,
      role: form.role,
      initials: form.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    };

    if (addUser) addUser(newUser);

    alert("User Created Successfully ✅");
    navigate("/admin/users");
  };

  return (
    <div className="p-6 bg-[#f5f7f6] ">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-gray-800">Add New User</h1>

      <p className="text-sm text-gray-500 mt-1 mb-6">
        Control access levels and manage your agricultural workforce.
      </p>

      {/* CARD */}
      <div className="bg-white rounded-2xl border p-8 shadow-sm">
        <div className="grid md:grid-cols-2 gap-6">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Full Name
            </label>
            <input
              className="w-full mt-1 px-3 py-2.5 border rounded-lg bg-gray-50 text-sm"
              placeholder="e.g. Raj Patel"
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Email Address
            </label>
            <input
              className="w-full mt-1 px-3 py-2.5 border rounded-lg bg-gray-50 text-sm"
              placeholder="raj@email.com"
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Assign Role
            </label>
            <select
              className="w-full mt-1 px-3 py-2.5 border rounded-lg bg-gray-50 text-sm"
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Temporary Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-3 py-2.5 border rounded-lg bg-gray-50 text-sm"
                placeholder="********"
                onChange={(e) => handleChange("password", e.target.value)}
              />

              {/* 🔥 TOGGLE */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        {/* ✅ ANIMATED CHECKBOX */}
        <div
          className="mt-6 flex items-start gap-3 cursor-pointer"
          onClick={() => setForm({ ...form, notify: !form.notify })}
        >
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-200
              ${
                form.notify
                  ? "bg-green-600 border-green-600 scale-110"
                  : "border-gray-300 bg-white"
              }`}
          >
            {form.notify && <span className="text-white text-xs">✓</span>}
          </div>

          <div>
            <p className="text-sm text-gray-800 font-medium">
              Notify user via email
            </p>
            <p className="text-xs text-gray-500">
              Send an invitation email with login credentials and setup
              instructions.
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="border-t mt-6 pt-6 flex justify-end gap-6 items-center">
          <button
            onClick={() => navigate("/admin/users")}
            className="text-gray-500 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg shadow text-sm"
          >
            <UserPlus size={16} />
            Create user
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white border rounded-xl p-5 flex gap-4 items-center">
          <div className="bg-green-100 p-3 rounded-lg text-green-700">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">TOTAL ADMINS</p>
            <h2 className="text-xl font-bold">1</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 flex gap-4 items-center">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <User size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">STANDARD USERS</p>
            <h2 className="text-xl font-bold">1</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 flex gap-4 items-center">
          <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">ACTIVE SEATS</p>
            <h2 className="text-xl font-bold">2/5</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
