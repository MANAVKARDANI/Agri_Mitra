import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload),
  forgotPassword: (payload) => api.post("/auth/forgot-password", payload),
  resetPassword: (payload) => api.post("/auth/reset-password", payload),
};

export const usersApi = {
  getAll: () => api.get("/users"),
  getMe: () => api.get("/users/me"),
  update: (id, payload) => api.put(`/users/${id}`, payload),
  remove: (id) => api.delete(`/users/${id}`),
};

export const productsApi = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  create: (payload) => api.post("/products", payload),
  update: (id, payload) => api.put(`/products/${id}`, payload),
  remove: (id) => api.delete(`/products/${id}`),
};

export const ordersApi = {
  getAll: () => api.get("/orders"),
  create: (payload) => api.post("/orders", payload),
  updateStatus: (id, status) => api.put(`/orders/${id}`, { status }),
};

export const suppliersApi = {
  getAll: () => api.get("/suppliers"),
  create: (payload) => api.post("/suppliers", payload),
  update: (id, payload) => api.put(`/suppliers/${id}`, payload),
  remove: (id) => api.delete(`/suppliers/${id}`),
};

export const dashboardApi = {
  stats: () => api.get("/dashboard/stats"),
};

export const uploadApi = {
  /** @param {File} file */
  image: (file) => {
    const form = new FormData();
    form.append("file", file);
    return api.post("/upload", form);
  },
};

export const paymentApi = {
  createOrder: (amount) => api.post("/payment/create-order", { amount }),
  verifyPayment: (payload) => api.post("/payment/verify", payload),
};

export default api;
