
/**
 * src/config/multer.config.js
 * FIXED Multer configuration
 */
 
import multer from "multer";
 
// Configure multer for in-memory file storage
const upload = multer({
  storage: multer.memoryStorage(),  // ✅ FIXED: lowercase 'storage'
  limits: {
    fileSize: 5 * 1024 * 1024  // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Only accept image files
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(new Error('Only image files (JPEG, PNG, WebP, GIF) are allowed'));
    }
    
    cb(null, true);
  }
});
 
export default upload;
 