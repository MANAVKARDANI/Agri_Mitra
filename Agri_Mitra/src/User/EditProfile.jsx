import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usersApi, API_BASE_URL } from "../services/api";
import { useToast } from "../context/ToastContext";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateStoredUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || "Hirva Togadiya");
  const [email, setEmail] = useState(user?.email || "hirva203@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.profile_image ? `${API_BASE_URL.replace("/api", "")}${user.profile_image}` : null
  );
  const [imageFile, setImageFile] = useState(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

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
      showError("Enter your current password to change password.");
      return;
    }
    try {
      setSaving(true);
      if (user?.id) {
        const payload = {
          name: name.trim(),
          email: email.trim(),
        };
        if (newPassword) {
          payload.currentPassword = currentPassword;
          payload.password = newPassword;
        }

        const { data } = await usersApi.update(user.id, payload);
        updateStoredUser(data);
      }
      if (imageFile) {
        await handleImageUpload();
      }
      showSuccess("Profile updated successfully.");
      navigate("/profile");
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const initials = (name || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-[#f7f7f7] min-h-screen flex items-center justify-center py-16">
      <div className="bg-white rounded-3xl shadow-xl w-[520px] p-10">
        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                className="w-24 h-24 rounded-full object-cover"
                alt="profile"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-2xl">
                {initials}
              </div>
            )}

            {/* IMAGE UPLOAD */}
            <label className="absolute bottom-0 right-0 bg-green-700 text-white rounded-full w-7 h-7 flex items-center justify-center shadow cursor-pointer">
              <span className="material-symbols-outlined text-sm">edit</span>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </label>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-4">{name}</h2>

          <p className="text-gray-500 text-sm">{email}</p>
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* CURRENT PASSWORD */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Current Password
            </label>

            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Your Current Password"
                className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-green-700"
              />

              <span
                onClick={() => setShowCurrent(!showCurrent)}
                className="material-symbols-outlined absolute right-3 top-5 text-gray-400 cursor-pointer"
              >
                {showCurrent ? "visibility" : "visibility_off"}
              </span>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              New Password
            </label>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Your New Password"
                className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-green-700"
              />

              <span
                onClick={() => setShowNew(!showNew)}
                className="material-symbols-outlined absolute right-3 top-5 text-gray-400 cursor-pointer"
              >
                {showNew ? "visibility" : "visibility_off"}
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg shadow-md font-semibold transition w-1/2"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
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
