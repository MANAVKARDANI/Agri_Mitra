import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ForgotImage from "./assets/forgotpass.png";
import { authApi } from "./services/api";
import { useToast } from "./context/ToastContext";

export default function ResetPassword() {
  const { token = "" } = useParams();
  const { showSuccess, showError } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(
    () => token && newPassword.length >= 6 && newPassword === confirmPassword,
    [token, newPassword, confirmPassword]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) {
      const errorMessage = "Enter matching passwords with at least 6 characters.";
      setMessage(errorMessage);
      showError(errorMessage);
      return;
    }

    try {
      setLoading(true);
      const { data } = await authApi.resetPassword(token, { newPassword });
      const successMessage = data?.message || "Password reset successful.";
      setMessage(successMessage);
      setNewPassword("");
      setConfirmPassword("");
      showSuccess("Password reset successful. You can log in now.");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Reset link is invalid or expired.";
      setMessage(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl flex overflow-hidden">
        <div className="w-full lg:w-1/2 p-12 flex items-center">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
            <h1 className="text-green-700 font-bold text-xl">AGRI-MITRA</h1>
            <p className="text-xs text-gray-400 tracking-widest mb-8">
              REAL-TIME STOCK ALERTS
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-gray-500 text-sm mb-8">
              Create a new password for your account.
            </p>

            <label className="text-sm text-gray-600" htmlFor="newPassword">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Enter new password"
              className="w-full mt-2 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
              autoComplete="new-password"
              required
              minLength={6}
            />

            <label className="text-sm text-gray-600 mt-4 block" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              className="w-full mt-2 p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700"
              autoComplete="new-password"
              required
              minLength={6}
            />

            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="w-full mt-6 bg-green-800 hover:bg-green-900 disabled:bg-gray-400 text-white py-3 rounded-full font-semibold transition"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>

            {message ? <p className="text-sm text-gray-600 mt-4">{message}</p> : null}

            <Link
              to="/login"
              className="flex items-center justify-center text-green-700 text-sm mt-6 hover:underline"
            >
              Back to Login
            </Link>
          </form>
        </div>

        <div className="hidden lg:block w-1/2 relative">
          <img src={ForgotImage} alt="Plant" className="h-full w-full object-cover" />
          <div className="absolute bottom-12 left-12 text-white text-sm max-w-xs">
            "Ensuring every field gets exactly what it needs, exactly when it needs it."
          </div>
        </div>
      </div>
    </div>
  );
}
