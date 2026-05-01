import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ForgotImage from "./assets/forgotpass.png";
import { authApi } from "./services/api";
import { useToast } from "./context/ToastContext";

export default function ForgotPassword() {
  const { showSuccess, showError } = useToast();
  const [searchParams] = useSearchParams();
  const tokenFromQuery = searchParams.get("token") || "";
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(tokenFromQuery);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState(tokenFromQuery ? "reset" : "request");

  const canSubmitReset = useMemo(
    () => token && newPassword && confirmPassword && newPassword === confirmPassword,
    [token, newPassword, confirmPassword]
  );

  const handleRequest = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showError("Enter a valid email.");
      return;
    }
    try {
      setLoading(true);
      const { data } = await authApi.forgotPassword({ email });
      setMessage("Reset link sent. Check your email.");
      showSuccess("Reset link sent.");
      if (data?.resetLink) {
        setMessage(
          `Reset link sent. Dev preview link: ${data.resetLink}`
        );
      }
    } catch {
      setMessage("Failed to send reset link.");
      showError("Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!canSubmitReset) {
      setMessage("Please provide valid token and matching passwords.");
      showError("Invalid reset form.");
      return;
    }
    if (newPassword.length < 6) {
      showError("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      await authApi.resetPassword({ token, newPassword });
      setMessage("Password changed successfully. You can login now.");
      showSuccess("Password reset successful.");
    } catch {
      setMessage("Failed to reset password. Token may be invalid or expired.");
      showError("Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

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
              {mode === "request" ? "Forgot Password?" : "Reset Password"}
            </h2>

            <p className="text-gray-500 text-sm mb-8">
              {mode === "request"
                ? "Enter your email address to receive a password reset link."
                : "Enter reset token and set your new password."}
            </p>

            {mode === "request" ? (
              <>
                <label className="text-sm text-gray-600">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@company.com"
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <button
                  onClick={handleRequest}
                  disabled={loading}
                  className="w-full mt-6 bg-green-800 hover:bg-green-900 text-white py-3 rounded-full font-semibold transition"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <button
                  onClick={() => setMode("reset")}
                  className="w-full mt-3 border border-green-700 text-green-700 py-3 rounded-full font-semibold transition"
                >
                  I have reset token
                </button>
              </>
            ) : (
              <>
                <label className="text-sm text-gray-600">Reset token</label>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste reset token"
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <label className="text-sm text-gray-600 mt-4 block">New password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <label className="text-sm text-gray-600 mt-4 block">Confirm password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <button
                  onClick={handleReset}
                  disabled={loading || !canSubmitReset}
                  className="w-full mt-6 bg-green-800 hover:bg-green-900 text-white py-3 rounded-full font-semibold transition"
                >
                  {loading ? "Updating..." : "Reset Password"}
                </button>
                <button
                  onClick={() => setMode("request")}
                  className="w-full mt-3 border border-green-700 text-green-700 py-3 rounded-full font-semibold transition"
                >
                  Back to email request
                </button>
              </>
            )}

            {message ? (
              <p className="text-xs text-gray-600 mt-4 break-words">{message}</p>
            ) : null}

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