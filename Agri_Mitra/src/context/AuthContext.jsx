/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { authApi, usersApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
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

  const refreshUser = async () => {
    if (!token) return null;
    const { data } = await usersApi.getMe();
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!token || user) return;
      try {
        const { data } = await usersApi.getMe();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
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
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
