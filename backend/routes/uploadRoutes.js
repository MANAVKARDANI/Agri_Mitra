import express from "express";
import path from "path";
import { uploadImage } from "../middleware/upload.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  (req, res, next) => {
    uploadImage.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message || "Upload failed" });
      }
      next();
    });
  },
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const url = `/uploads/${path.basename(req.file.filename)}`;
    return res.status(201).json({ url });
  }
);

export default router;
