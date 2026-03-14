import { useState } from "react";

export default function Profile() {
  const [changePassword] = useState(true);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="bg-[#f7f7f7] min-h-screen flex items-center justify-center py-16">
      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl shadow-xl w-[520px] p-10">
        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzkYu5I16QjD3rwGS-AR1eV2szNmQx_YnJv26W353TfKEeTAcuLKjf5JlALV7oRbMtUlwwvXm9S928ZXUoFt4aEHZdvMLepmCk0r0vdYRY9Ohp5QwMam0AC5YybXQmYZ2SEUv2kbyo5af42i9BQNh8MSRY43Y894gH02jWmO7OsEAonYmMrKHbVXO4IrEBTcY1YwivoAGnQfT2-E6fYlKqPCOI_oG9Ry9YjKsZguv2ISmwWN25cn4Uz7GRN0oy7hLKji30FaKXxtIq"
              className="w-24 h-24 rounded-full object-cover"
            />

            {/* EDIT ICON */}
            <div className="absolute bottom-0 right-0 bg-green-700 text-white rounded-full w-7 h-7 flex items-center justify-center shadow">
              <span className="material-symbols-outlined text-sm">edit</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-4">
            Hirva Togadiya
          </h2>

          <p className="text-gray-500 text-sm">hirva203@gmail.com</p>
        </div>

        {/* FORM */}
        <form className="space-y-6">
          {/* FULL NAME */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="Hirva Togadiya"
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
              defaultValue="hirva203@gmail.com"
              className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* CHANGE PASSWORD */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-green-700">
              check_circle
            </span>

            <label className="text-sm text-gray-700">Change Password</label>
          </div>

          {/* CURRENT PASSWORD */}
          {changePassword && (
            <>
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
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
            </>
          )}

          {/* BUTTONS */}
          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg shadow-md font-semibold transition"
            >
              Edit
            </button>

            <button
              type="button"
              className="border border-green-700 text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              Order History
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
