import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../services/api";

export default function Profile() {
  const { user } = useAuth();
  const userName = user?.name || "User";
  const userEmail = user?.email || "user@email.com";
  const profileImage = user?.profile_image ? `${API_BASE_URL.replace("/api", "")}${user.profile_image}` : null;

  return (
    <div className="bg-[#f7f7f7] min-h-screen flex items-center justify-center py-16">
      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl shadow-xl w-[520px] p-10">
        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-2xl">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-4">
            {userName}
          </h2>

          <p className="text-gray-500 text-sm">{userEmail}</p>
        </div>

        {/* PROFILE DETAILS */}
        <div className="space-y-6">
          {/* FULL NAME */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={userName}
              disabled
              className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Email Address
            </label>

            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* PASSWORD INFO */}
          <div className="flex items-center gap-3 mt-2">
            <span className="material-symbols-outlined text-green-700">
              check_circle
            </span>

            <p className="text-sm text-gray-700">Password protected account</p>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between pt-6">
            <Link to="/edit-profile">
              <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg shadow-md font-semibold transition">
                Edit Profile
              </button>
            </Link>

            <button
              type="button"
              className="border border-green-700 text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              Order History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
