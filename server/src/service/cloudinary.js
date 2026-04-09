// import {v2 as cloudinary} from 'cloudinary'
// import fs from 'fs'

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY

// })

// export const uploadMedia = async (filePath) => {
//     try {
//         if (!filePath) return null; 
        
//         //upload file on cloudinary 
//        const response = await cloudinary.uploader.upload( filePath, {
//             unique_filename: true,
//             resource_type: 'auto'
//         })

//         //clean temp storage 
//         fs.unlinkSync(filePath)

//         // log message 
//         console.log("File uploaded on cloudinary ", response.url);

//         //return the response 
//         return response;

//     } catch (error) {
        
//         if( fs.existsSync(filePath))
//         fs.unlinkSync(filePath)
//         return null;
        
//     };
   
// };

// export default cloudinary;


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  // BUG FIX: the official Cloudinary SDK env var is CLOUDINARY_API_SECRET,
  // NOT CLOUDINARY_SECRET_KEY. If your .env uses the official name,
  // uploads silently returned null because the secret was undefined.
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
const cleanTemp = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (e) {
    console.warn("[cloudinary] Could not delete temp file:", filePath, e.message);
  }
};
 
export const uploadMedia = async (filePath) => {
  if (!filePath) return null;
 
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      unique_filename: true,
      resource_type:   "auto",
    });
 
    cleanTemp(filePath); // remove temp file after successful upload
    console.log("[cloudinary] Uploaded:", response.secure_url);
    return response;
 
  } catch (error) {
    console.error("[cloudinary] Upload failed:", error.message);
    cleanTemp(filePath); // always clean up even on failure
    return null;
  }
};
 
export default cloudinary;
 