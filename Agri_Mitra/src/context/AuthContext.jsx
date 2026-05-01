/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { authApi, usersApi } from "../services/api";

const AuthContext = createContext(null);

function readJsonStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJsonStorage("user", null));
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const persist = (nextToken, nextUser) => {
    localStorage.setItem("token", nextToken);
    localStorage.setItem("user", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const login = async ({ email, password, role }) => {
    setLoading(true);
    try {
      const { data } = await authApi.login({ email, password });
      if (role && data.user.role !== role.toLowerCase()) {
        throw new Error(`Account is not registered as ${role}`);
      }
      persist(data.token, data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password, role = "user" }) => {
    setLoading(true);
    try {
      const { data } = await authApi.register({ name, email, password, role });
      persist(data.token, data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const updateStoredUser = (nextUser) => {
    localStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!token || user) return;
      try {
        const { data } = await usersApi.getMe();
        updateStoredUser(data);
      } catch {
        logout();
      }
    };
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
    updateStoredUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
