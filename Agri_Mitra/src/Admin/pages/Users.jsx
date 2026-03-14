import {
  UserPlus,
  Pencil,
  Trash2,
  ShieldCheck,
  User,
  Shield,
} from "lucide-react";

export default function Users() {
  const users = [
    {
      id: "001",
      name: "Raj Patel",
      initials: "RP",
      email: "raj@email.com",
      role: "ADMIN",
    },
    {
      id: "002",
      name: "Meera Shah",
      initials: "MS",
      email: "meera@email.com",
      role: "USER",
    },
    {
      id: "003",
      name: "Amit Verma",
      initials: "AV",
      email: "amit@email.com",
      role: "USER",
    },
    {
      id: "004",
      name: "Karan Singh",
      initials: "KS",
      email: "karan@email.com",
      role: "USER",
    },
    {
      id: "005",
      name: "Priya Sharma",
      initials: "PS",
      email: "priya@email.com",
      role: "ADMIN",
    },
    {
      id: "006",
      name: "Neha Gupta",
      initials: "NG",
      email: "neha@email.com",
      role: "USER",
    },
    {
      id: "007",
      name: "Rahul Mehta",
      initials: "RM",
      email: "rahul@email.com",
      role: "USER",
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* ================= HEADER ================= */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>

          <p className="text-sm text-gray-500">
            Control access levels and manage your agricultural workforce.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm">
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      {/* ================= USERS TABLE ================= */}

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="text-left">User</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-4 text-gray-500">{user.id}</td>

                {/* User */}
                <td className="flex items-center gap-3 p-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold

                    ${
                      user.role === "ADMIN"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }

                  `}
                  >
                    {user.initials}
                  </div>

                  {user.name}
                </td>

                <td className="text-gray-600">{user.email}</td>

                {/* Role */}
                <td>
                  {user.role === "ADMIN" ? (
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      ADMIN
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      USER
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="flex gap-3 text-gray-500">
                  <button className="hover:text-blue-600">
                    <Pencil size={16} />
                  </button>

                  <button className="hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}

        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
          Showing 2 active users in the system.
          <div className="flex gap-2 items-center">Page 1 of 1</div>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Admins */}
        <div className="bg-white border rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-700">
            <ShieldCheck size={20} />
          </div>

          <div>
            <p className="text-xs text-gray-500">TOTAL ADMINS</p>
            <h2 className="text-xl font-bold">1</h2>
          </div>
        </div>

        {/* Users */}
        <div className="bg-white border rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <User size={20} />
          </div>

          <div>
            <p className="text-xs text-gray-500">STANDARD USERS</p>
            <h2 className="text-xl font-bold">1</h2>
          </div>
        </div>

        {/* Seats */}
        <div className="bg-white border rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-700">
            <Shield size={20} />
          </div>

          <div>
            <p className="text-xs text-gray-500">ACTIVE SEATS</p>
            <h2 className="text-xl font-bold">2/5</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
