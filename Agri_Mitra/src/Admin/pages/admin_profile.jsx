import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [changePassword, setChangePassword] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500 text-sm">
          Manage your account settings and regional preferences
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-xl border border-green-100 p-6 flex justify-between items-center shadow-sm">

        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-xl shadow">
            MK
          </div>

          {/* Info */}
          <div>
            <h2 className="font-semibold text-lg">Manav Kardani</h2>
            <p className="text-sm text-gray-500">
              manavkardani470@gmail.com
            </p>

            <div className="flex gap-2 mt-2">
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                PREMIUM PLAN
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                ADMIN
              </span>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800">
          Edit Profile
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm space-y-6">

        {/* NAME */}
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            defaultValue="Manav Kardani"
            className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none"
          />
        </div>

        {/* TOGGLE */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setChangePassword(!changePassword)}
            className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
              changePassword ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ${
                changePassword ? "translate-x-5" : ""
              }`}
            ></div>
          </div>
          <span className="text-sm text-gray-700">Change Password</span>
        </div>

        {/* PASSWORD FIELDS */}
        {changePassword && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">
                Current Password
              </label>
              <input
                type="password"
                placeholder="password123"
                className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50"
              />
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-between items-center pt-4">

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="text-red-600 text-sm font-semibold hover:underline"
          >
             Log Out
          </button>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm">
              Cancel
            </button>

            <button className="px-6 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800">
              Save Changes
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}