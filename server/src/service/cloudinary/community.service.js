// // service/profileCloudinary.service.js
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
 
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key:    process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const cleanTemp = (filePath) => {
//   try {
//     if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
//   } catch (e) {
//     console.warn("[cloudinary] Could not delete temp file:", filePath, e.message);
//   }
// };

// // Updated to accept a dynamic folder name
// export const uploadCommunityToCloudinary = async (filePath, folderPath = "/Community") => {
//   if (!filePath) return null;
 
//   try {
//     const response = await cloudinary.uploader.upload(filePath, {
//       folder: folderPath,
//       unique_filename: true,
//       resource_type:   "auto",
//     });
 
//     cleanTemp(filePath); // remove temp file after successful upload
//     console.log("[cloudinary] Uploaded:", response.secure_url);
//     return response.secure_url; // Return just the URL for easy database saving
 
//   } catch (error) {
//     console.error("[cloudinary] Upload failed:", error.message);
//     cleanTemp(filePath); 
//     return null;
//   }
// };

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

// ✅ FIXED: Return both URL and fileKey (public_id)
export const uploadCommunityToCloudinary = async (filePath, folderPath = "/Community") => {
  if (!filePath) {
    throw new Error("File path is required for upload");
  }
 
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      folder: folderPath,
      unique_filename: true,
      resource_type: "auto",
    });
 
    cleanTemp(filePath); // remove temp file after successful upload
    console.log("[cloudinary] Uploaded:", response.secure_url);
    
    // ✅ Return both URL and public_id (fileKey)
    return {
      secure_url: response.secure_url,
      public_id: response.public_id,
      // Optional: Add more useful metadata
      format: response.format,
      width: response.width,
      height: response.height,
    };
 
  } catch (error) {
    console.error("[cloudinary] Upload failed:", error.message);
    cleanTemp(filePath);
    // ✅ Throw error instead of returning null
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

// ✅ BONUS: Add a delete function for when communities are deleted
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;

  try {
    const response = await cloudinary.uploader.destroy(publicId);
    console.log("[cloudinary] Deleted:", publicId, response);
    return response;
  } catch (error) {
    console.error("[cloudinary] Delete failed:", error.message);
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};