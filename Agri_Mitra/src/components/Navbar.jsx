import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">

      <h2 className="font-semibold text-lg">
        Admin Dashboard Overview
      </h2>

      <div className="flex items-center gap-5">

        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={16} className="text-gray-400"/>
          <input
            className="bg-transparent outline-none ml-2 text-sm"
            placeholder="Search data..."
          />
        </div>

        <Bell className="text-gray-500"/>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">
            Admin User
          </span>
        </div>

      </div>

    </div>
  );
}