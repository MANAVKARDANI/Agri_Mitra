import { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "./assets/login.png";

export default function Login() {

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (

    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl flex overflow-hidden">

        {/* LEFT SIDE (FORM) */}
        <div className="w-full md:w-1/2 p-10 lg:p-14">

          <h1 className="text-2xl font-bold text-gray-800">AGRI-MITRA</h1>

          <p className="text-xs text-gray-500 mt-1">
            KNOW BEFORE YOU GO: REAL-TIME FERTILIZER STOCK ALERTS.
          </p>

          <h2 className="text-xl font-semibold mt-10 text-gray-800">
            Welcome back!
          </h2>

          <p className="text-sm text-gray-500 mb-8">
            Enter your Credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Role */}
            <div>

              <label className="text-sm text-gray-600">Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
              >

                <option>Select Option</option>
                <option>Admin</option>
                <option>Supplier</option>
                <option>User</option>

              </select>

            </div>

            {/* Email */}
            <div>

              <label className="text-sm text-gray-600">Email address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

            </div>

            {/* Password */}
            <div>

              <label className="text-sm text-gray-600">Password</label>

              <div className="relative">

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                />

              </div>

              <div className="text-right mt-2">
                <a href="#" className="text-xs text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-full font-semibold transition"
            >
              Login
            </button>

          </form>

          {/* Divider */}
          <div className="text-center text-sm text-gray-400 my-6">
            Or
          </div>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?

            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Sign Up
            </Link>

          </p>

        </div>

        {/* RIGHT SIDE (IMAGE) */}
        <div className="hidden md:block md:w-1/2 relative">

          <img
            src={loginImage}
            className="h-full w-full object-cover"
            alt="Farm Field"
          />

        </div>

      </div>

    </div>

  );
}