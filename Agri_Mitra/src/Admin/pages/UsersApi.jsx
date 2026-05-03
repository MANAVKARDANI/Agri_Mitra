import {
  UserPlus,
  Pencil,
  Trash2,
  ShieldCheck,
  User,
  Shield,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersApi } from "../../services/api";
import { useToast } from "../../context/ToastContext";
import { resolveMediaUrl } from "../../utils/assetUrl";

const emptyForm = { name: "", email: "", role: "user", newPassword: "" };

export default function UsersApi() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadUsers = async () => {
    try {
      const { data } = await usersApi.getAll();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
  }, []);

  const adminCount = useMemo(
    () => users.filter((u) => u.role === "admin").length,
    [users]
  );
  const userCount = users.length - adminCount;

  const openEdit = (user) => {
    setEditing(user);
    setForm({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      newPassword: "",
    });
  };

  const closeEdit = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const saveEdit = async () => {
    if (!editing?.id) return;
    if (!form.name?.trim() || !form.email?.trim()) {
      showError("Name and email are required.");
      return;
    }
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
      };
      if (form.newPassword?.trim().length >= 6) {
        payload.password = form.newPassword.trim();
      }
      await usersApi.update(editing.id, payload);
      showSuccess("User updated.");
      closeEdit();
      loadUsers();
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await usersApi.remove(id);
      loadUsers();
    } catch {
      showError("Failed to delete user");
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500">
            Edit users from the pencil icon. Admins can reset another user&apos;s password below.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/add-user")}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm"
        >
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

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
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-4 text-gray-500">{String(user.id).padStart(3, "0")}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={resolveMediaUrl(user.avatar)}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                    {user.name}
                  </div>
                </td>
                <td className="text-gray-600">{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      ADMIN
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      USER
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex gap-3 text-gray-500">
                    <button
                      type="button"
                      className="hover:text-blue-600"
                      onClick={() => openEdit(user)}
                      aria-label="Edit user"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      className="hover:text-red-600"
                      onClick={() => handleDelete(user.id)}
                      aria-label="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
          Showing {users.length} active users in the system.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-700">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500">TOTAL ADMINS</p>
            <h2 className="text-xl font-bold">{adminCount}</h2>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <User size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500">STANDARD USERS</p>
            <h2 className="text-xl font-bold">{userCount}</h2>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-700">
            <Shield size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500">ACTIVE SEATS</p>
            <h2 className="text-xl font-bold">{users.length}/50</h2>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              type="button"
              onClick={closeEdit}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Edit user</h2>
            <div className="space-y-3 text-sm">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Name"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Email"
              />
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <input
                type="password"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="New password (optional, min 6 chars)"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={closeEdit}
                className="px-4 py-2 border rounded-lg text-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
