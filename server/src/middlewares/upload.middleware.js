import multer from "multer";
import fs     from "fs";
import path   from "path";
 
const tempDir = path.join(process.cwd(), "public/temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}
 
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, tempDir),
  filename:    (_req,  file, cb) => {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${suffix}`);
  },
});
 
export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB per file
 
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      // BUG FIX: cb(new Error("msg"), false) — false is the 2nd arg, not inside Error()
      cb(new Error("Only images and videos are allowed"), false);
    }
  },
});
 
// ── Multer error handler (attach AFTER routes) ───────────────────────────────
// Usage in app.js / server.js:  app.use(multerErrorHandler)
export const multerErrorHandler = (err, _req, res, next) => {
  if (err instanceof multer.MulterError) {
    // e.g. LIMIT_FILE_SIZE, LIMIT_UNEXPECTED_FILE
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  if (err?.message === "Only images and videos are allowed") {
    return res.status(400).json({ message: err.message });
  }
  next(err); // pass other errors to the global error handler
};