import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.join(__dirname, "..", "..", "uploads");

const createStorage = (subdir) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const username = req.user?.name || req.body.name || "unknown";
      const usernameSafe = username.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      const dest = path.join(uploadsRoot, subdir, usernameSafe);
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const uploadUserImage = multer({
  storage: createStorage("users"),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("profileImage");

export const uploadAdminImage = multer({
  storage: createStorage("admin"),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("profileImage");

export const getPublicPath = (file) => {
  if (!file) return null;
  return `/uploads/${file.destination.split("uploads")[1]}/${file.filename}`;
};