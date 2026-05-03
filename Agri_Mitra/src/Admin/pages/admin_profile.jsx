import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { uploadApi, usersApi } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { resolveMediaUrl } from "../../utils/assetUrl";

export default function Profile() {
  const navigate = useNavigate();
  const { logout, user, refreshUser } = useAuth();
  const { showSuccess, showError } = useToast();

  const [changePassword, setChangePassword] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const displayName = user?.name || "Admin";
  const displayEmail = user?.email || "";
  const avatarSrc = resolveMediaUrl(user?.avatar);
  const initials = displayName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;
    try {
      setUploading(true);
      const { data } = await uploadApi.image(file);
      const url = data?.url;
      if (!url) throw new Error("No URL");
      await usersApi.update(user.id, { avatar: url });
      await refreshUser();
      showSuccess("Profile photo updated.");
    } catch {
      showError("Could not update photo.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500 text-sm">
          Manage your account settings and regional preferences
        </p>
      </div>

      <div className="bg-white rounded-xl border border-green-100 p-6 flex justify-between items-center shadow-sm flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative group">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt=""
                className="w-16 h-16 rounded-full object-cover border border-green-200 shadow"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-xl shadow">
                {initials}
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-semibold text-lg">{displayName}</h2>
            <p className="text-sm text-gray-500">{displayEmail}</p>

            <div className="flex gap-2 mt-2">
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                ADMIN
              </span>
            </div>
            <label className="mt-3 inline-block text-sm text-green-700 font-semibold cursor-pointer hover:underline disabled:opacity-50">
              {uploading ? "Updating..." : "Change photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={handlePhotoChange}
              />
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/edit-profile")}
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800"
        >
          Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm space-y-6">
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            value={displayName}
            readOnly
            className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none text-gray-600"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setChangePassword(!changePassword)}
            className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
              changePassword ? "bg-green-600" : "bg-gray-300"
            }`}
            aria-pressed={changePassword}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ${
                changePassword ? "translate-x-5" : ""
              }`}
            />
          </button>
          <span className="text-sm text-gray-700">Change Password (use Edit Profile)</span>
        </div>

        {changePassword && (
          <p className="text-sm text-gray-500">
            Open <strong>Edit Profile</strong> to securely change your password with your current
            password confirmation.
          </p>
        )}

        <div className="flex justify-between items-center pt-4 flex-wrap gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="text-red-600 text-sm font-semibold hover:underline"
          >
            Log Out
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => navigate("/edit-profile")}
              className="px-6 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
