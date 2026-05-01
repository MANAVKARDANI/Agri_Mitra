/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

let nextToastId = 1;
const TOAST_DURATION_BY_TYPE = {
  success: 2200,
  info: 2800,
  error: 4200,
};

export function ToastProvider({ children }) {
  const ANIMATION_MS = 260;
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const pushToast = (message, type = "info") => {
    const id = nextToastId++;
    setToasts((prev) => [...prev, { id, message, type, leaving: false }]);
    const duration = TOAST_DURATION_BY_TYPE[type] ?? 2800;
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, leaving: true } : toast
        )
      );
      setTimeout(() => removeToast(id), ANIMATION_MS);
    }, duration);
  };

  const showSuccess = (message) => pushToast(message, "success");
  const showError = (message) => pushToast(message, "error");
  const showInfo = (message) => pushToast(message, "info");

  const value = { showSuccess, showError, showInfo };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-sm text-white min-w-[220px] max-w-[320px] flex items-start justify-between gap-3 ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                  ? "bg-red-600"
                  : "bg-gray-700"
            } transform transition-all duration-300 ease-out ${
              toast.leaving
                ? "opacity-0 translate-y-2 scale-[0.98]"
                : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-white/90 hover:text-white leading-none"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

