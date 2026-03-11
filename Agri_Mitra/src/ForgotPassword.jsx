import { Link } from "react-router-dom";
import ForgotImage from "./assets/forgotpass.png";

export default function ForgotPassword() {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl flex overflow-hidden">

        {/* LEFT FORM SECTION */}
        <div className="w-full lg:w-1/2 p-12 flex items-center">

          <div className="max-w-md mx-auto w-full">

            <h1 className="text-green-700 font-bold text-xl">
              AGRI-MITRA
            </h1>

            <p className="text-xs text-gray-400 tracking-widest mb-8">
              REAL-TIME STOCK ALERTS
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Forgot Password?
            </h2>

            <p className="text-gray-500 text-sm mb-8">
              Enter your email address to receive a password reset link.
            </p>

            <label className="text-sm text-gray-600">
              Email address
            </label>

            <input
              type="email"
              placeholder="e.g. name@company.com"
              className="w-full mt-2 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            <button
              className="w-full mt-6 bg-green-800 hover:bg-green-900 text-white py-3 rounded-full font-semibold transition"
            >
              Send Reset Link
            </button>

            <Link
              to="/"
              className="flex items-center justify-center text-green-700 text-sm mt-6 hover:underline"
            >
              ← Back to Login
            </Link>

          </div>

        </div>

        {/* RIGHT IMAGE PANEL */}
        <div className="hidden lg:block w-1/2 relative">

          <img
            src={ForgotImage}
            alt="Plant"
            className="h-full w-full object-cover"
          />

          {/* TEXT OVER IMAGE */}
          <div className="absolute bottom-12 left-12 text-white text-sm max-w-xs">
            "Ensuring every field gets exactly what it needs, exactly when it needs it."
          </div>

        </div>

      </div>

    </div>
  );
}