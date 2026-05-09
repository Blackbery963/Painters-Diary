// service/profileCloudinary.service.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cleanTemp = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (e) {
    console.warn("[cloudinary] Could not delete temp file:", filePath, e.message);
  }
};

// Updated to accept a dynamic folder name
export const uploadCoverToCloudinary = async (filePath, folderPath = "/Profile/cover",) => {
  if (!filePath) return null;
 
  try {
    const response = await cloudinary.uploader.upload(filePath,  {
      folder: folderPath, // You can change this to "/Profile/cover" when uploading cover photos
      unique_filename: true,
      resource_type:   "auto",
    });
 
    cleanTemp(filePath); // remove temp file after successful upload
    console.log("[cloudinary] Uploaded:", response.secure_url);
    return response.secure_url; // Return just the URL for easy database saving
 
  } catch (error) {
    console.error("[cloudinary] Upload failed:", error.message);
    cleanTemp(filePath); 
    return null;
  }
};

