/**
 * src/config/cloudinary.config.js
 * Cloudinary initialization with environment variables
 */

import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  // BUG FIX: the official Cloudinary SDK env var is CLOUDINARY_API_SECRET,
  // NOT CLOUDINARY_SECRET_KEY. If your .env uses the official name,
  // uploads silently returned null because the secret was undefined.
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
