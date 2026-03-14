import { Link } from "react-router-dom";

export default function Profile() {
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

        {/* PROFILE DETAILS */}
        <div className="space-y-6">
          {/* FULL NAME */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value="Hirva Togadiya"
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
              value="hirva203@gmail.com"
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
