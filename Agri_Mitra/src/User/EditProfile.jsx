import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usersApi, uploadApi } from "../services/api";
import { useToast } from "../context/ToastContext";
import { resolveMediaUrl } from "../utils/assetUrl";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const { showSuccess, showError } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarUrl(user.avatar || "");
      setAvatarFile(null);
    }
  }, [user]);

  const filePreview = useMemo(
    () => (avatarFile ? URL.createObjectURL(avatarFile) : ""),
    [avatarFile]
  );

  useEffect(() => {
    if (!filePreview) return;
    return () => URL.revokeObjectURL(filePreview);
  }, [filePreview]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showError("Name and email are required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("Please enter a valid email.");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      showError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword && !currentPassword) {
      showError("Enter your current password to set a new one.");
      return;
    }
    try {
      setLoading(true);
      if (!user?.id) {
        showError("Not signed in.");
        return;
      }
      let avatar = avatarUrl.trim();
      if (avatarFile) {
        const { data } = await uploadApi.image(avatarFile);
        avatar = data?.url || avatar;
      }
      const payload = { name: name.trim(), email: email.trim(), avatar };
      if (newPassword) {
        payload.password = newPassword;
        payload.currentPassword = currentPassword;
      }
      await usersApi.update(user.id, payload);
      await refreshUser();
      showSuccess("Profile updated successfully.");
      if (user?.role === "admin") {
        navigate("/admin/profile");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to update profile";
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen flex items-center justify-center py-16">
      <div className="bg-white rounded-3xl shadow-xl w-[520px] p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            {filePreview ? (
              <img
                src={filePreview}
                alt=""
                className="w-24 h-24 rounded-full object-cover border-2 border-green-200"
              />
            ) : resolveMediaUrl(avatarUrl) ? (
              <img
                src={resolveMediaUrl(avatarUrl)}
                alt=""
                className="w-24 h-24 rounded-full object-cover border-2 border-green-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-green-900 font-bold text-2xl">
                {(name || user?.name || "U")
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow cursor-pointer text-lg leading-none">
              +
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-4">{name || user?.name}</h2>

          <p className="text-gray-500 text-sm">{email || user?.email}</p>
          {user?.role === "admin" && (
            <span className="mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Admin</span>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-600 font-medium">Profile photo URL (optional)</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-700 text-sm"
              placeholder="https://... or leave empty if you upload a file"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Full Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Current Password</label>
            <p className="text-xs text-gray-400 mb-1">Required only when changing password</p>

            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-green-700"
              />

              <span
                role="button"
                tabIndex={0}
                onClick={() => setShowCurrent(!showCurrent)}
                onKeyDown={(e) => e.key === "Enter" && setShowCurrent(!showCurrent)}
                className="material-symbols-outlined absolute right-3 top-5 text-gray-400 cursor-pointer"
              >
                {showCurrent ? "visibility" : "visibility_off"}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">New Password</label>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Leave blank to keep current password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-green-700"
              />

              <span
                role="button"
                tabIndex={0}
                onClick={() => setShowNew(!showNew)}
                onKeyDown={(e) => e.key === "Enter" && setShowNew(!showNew)}
                className="material-symbols-outlined absolute right-3 top-5 text-gray-400 cursor-pointer"
              >
                {showNew ? "visibility" : "visibility_off"}
              </span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg shadow-md font-semibold transition w-1/2 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() =>
                user?.role === "admin" ? navigate("/admin/profile") : navigate("/profile")
              }
              className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition w-1/2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
