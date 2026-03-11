import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterImage from "./assets/register.png";


export default function Register() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
  };

  return (

    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl flex overflow-hidden">

        {/* LEFT GREEN PANEL */}
        <div className="hidden lg:flex w-1/4 bg-green-800 text-white flex-col justify-between p-10">

          <div>
            <h1 className="text-xl font-bold">AGRI-MITRA</h1>
          </div>

          <div className="space-y-10">

            <div>
              <p className="text-xs uppercase tracking-widest opacity-80">
                Community
              </p>

              <h2 className="text-4xl font-bold mt-2">10k+</h2>

              <p className="text-sm opacity-80 mt-2">
                Farmers optimizing yields daily.
              </p>
            </div>

            <div className="border-t border-white/20 pt-6">

              <p className="text-xs uppercase tracking-widest opacity-80">
                Speed
              </p>

              <h2 className="text-3xl font-bold mt-2">Real-time</h2>

              <p className="text-sm opacity-80 mt-2">
                Instant stock alerts.
              </p>

            </div>

          </div>

          <div className="text-xs opacity-60">
            © 2026 AGRI-MITRA Inc.
          </div>

        </div>

        {/* CENTER FORM SECTION */}
        <div className="w-full lg:w-2/4 p-12">

          <div className="max-w-md mx-auto">

            <h2 className="text-3xl font-extrabold text-gray-800">
              Join the Network
            </h2>

            <p className="text-gray-500 mt-2">
              Create your free account to access global fertilizer data.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">

                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
                />

                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
                />

              </div>

              {/* Email */}
              <input
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
              />

              {/* Farm */}
              <input
                name="businessName"
                placeholder="Farm / Business Name"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
              />

              {/* Password */}
              <div className="relative">

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-lg font-semibold shadow-md transition"
              >
                Create Account
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center my-6">

              <div className="flex-grow border-t border-gray-300"></div>

              <span className="px-4 text-sm text-gray-400">
                OR JOIN WITH
              </span>

              <div className="flex-grow border-t border-gray-300"></div>

            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">

              <button className="border rounded-lg py-2 text-sm font-medium hover:bg-gray-50">
                Google
              </button>

              <button className="border rounded-lg py-2 text-sm font-medium hover:bg-gray-50">
                Apple
              </button>

            </div>

            <p className="text-center text-sm text-gray-500 mt-6">

              Already a member?

              <Link
                to="/"
                className="text-green-700 font-semibold hover:underline ml-1"
              >
                Log in
              </Link>

            </p>

          </div>

        </div>

        {/* RIGHT IMAGE PANEL */}
        <div className="hidden lg:block w-1/4 relative">

          <img
            src={RegisterImage}
            className="h-full w-full object-cover"
            alt="Leaf Image"
          />

        </div>

      </div>

    </div>

  );
}