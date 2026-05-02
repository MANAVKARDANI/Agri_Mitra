import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { usersApi, API_BASE_URL } from "../../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const { logout, user, updateStoredUser } = useAuth();
  const { showError, showSuccess } = useToast();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.profile_image ? `${API_BASE_URL.replace("/api", "")}${user.profile_image}` : null
  );
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user?.name, user?.email]);

  const initials = (user?.name || "Admin")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showError("Please select a valid image file");
        return;
      }
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setCurrentPassword("");
    setNewPassword("");
    setChangePassword(false);
    setImageFile(null);
    setProfileImage(user?.profile_image ? `${API_BASE_URL.replace("/api", "")}${user.profile_image}` : null);
  };

  const handleImageUpload = async () => {
    if (!imageFile || !user?.id) return;

    const formData = new FormData();
    formData.append("profileImage", imageFile);
    formData.append("name", name.trim());
    formData.append("email", email.trim());

    try {
      const { data } = await usersApi.updateImage(user.id, formData);
      updateStoredUser(data);
      showSuccess("Profile image updated");
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to update image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      showError("Admin profile is not loaded.");
      return;
    }
    if (!name.trim() || !email.trim()) {
      showError("Name and email are required.");
      return;
    }
    if (changePassword && newPassword.length < 6) {
      showError("New password must be at least 6 characters.");
      return;
    }
    if (changePassword && !currentPassword) {
      showError("Enter current password to change password.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: name.trim(),
        email: email.trim(),
      };
      if (changePassword && newPassword) {
        payload.currentPassword = currentPassword;
        payload.password = newPassword;
      }

      const { data } = await usersApi.update(user.id, payload);
      updateStoredUser(data);
      
      if (imageFile) {
        await handleImageUpload();
      }
      
      setCurrentPassword("");
      setNewPassword("");
      setChangePassword(false);
      showSuccess("Admin profile updated.");
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to update admin profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500 text-sm">
          Manage your admin account details and password.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-green-100 p-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-xl shadow">
                {initials}
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-green-700 text-white rounded-full w-5 h-5 flex items-center justify-center shadow cursor-pointer">
              <span className="material-symbols-outlined text-xs">edit</span>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </label>
          </div>

          <div>
            <h2 className="font-semibold text-lg">{user?.name || "Admin"}</h2>
            <p className="text-sm text-gray-500">{user?.email || "admin@email.com"}</p>

            <div className="flex gap-2 mt-2">
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                ADMIN
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                DATABASE ACCOUNT
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={changePassword}
            onChange={(e) => setChangePassword(e.target.checked)}
            className="h-4 w-4 accent-green-700"
          />
          <span className="text-sm text-gray-700">Change Password</span>
        </label>

        {changePassword && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
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
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
