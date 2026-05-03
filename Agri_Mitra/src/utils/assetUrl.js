export function getApiOrigin() {
  const base = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  return base.replace(/\/api\/?$/, "");
}

/** Resolve stored path (/uploads/...) or absolute URL for <img src>. */
export function resolveMediaUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  const s = String(pathOrUrl).trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  const origin = getApiOrigin();
  const path = s.startsWith("/") ? s : `/${s}`;
  return `${origin}${path}`;
}
