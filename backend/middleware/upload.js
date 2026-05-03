import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "") || ".jpg";
    const uid = req.user?.id != null ? `user-${req.user.id}-` : "";
    const base = path
      .basename(file.originalname || "photo", ext)
      .replace(/[^a-zA-Z0-9-_]/g, "")
      .slice(0, 40) || "photo";
    cb(null, `${uid}${base}-${Date.now()}${ext}`);
  },
});

const imageFilter = (_req, file, cb) => {
  if (!file.mimetype || !file.mimetype.startsWith("image/")) {
    cb(new Error("Only image uploads are allowed"));
    return;
  }
  cb(null, true);
};

export const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
