// // // /controllers/upload.controller.js

// // import { Media } from "../models/media.model.js";
// // import {sortTags} from "../utils/tagSorter.js"

// // export const createPost = async (req, res) => {
// //     try {
// //         // 1. Extract data from the frontend request
// //         // 'tags' here is the single array: e.g., ["portrait", "travel", "my hostel room"]
// //         const { title, description, tags, isForSale, price, isAwardWinning } = req.body;
        
// //         // *Note: We will handle mediaFiles (Backblaze URLs) separately*
// //         const mediaFiles = req.body.mediaFiles || []; 

// //         // 2. MAGIC HAPPENS HERE: Sort the unified tags array
// //         const { categoryTags, styleTags, generalTags } = sortTags(tags);

// //         // 3. Save to MongoDB
// //         const newPost = await Media.create({
// //             artist: req.user._id, // Assuming you have authentication middleware setting req.user
// //             title,
// //             description,
// //             mediaFiles,
            
// //             // Pass the newly sorted arrays
// //             categoryTags,
// //             styleTags,
// //             generalTags,
            
// //             forSale: isForSale,
// //             price: isForSale ? price : undefined,
// //             isAwarded: isAwardWinning
// //         });

// //         return res.status(201).json({
// //             success: true,
// //             message: "Masterpiece published successfully!",
// //             data: newPost
// //         });

// //     } catch (error) {
// //         console.error("Error creating post:", error);
// //         return res.status(500).json({
// //             success: false,
// //             message: "Failed to publish post",
// //             error: error.message
// //         });
// //     }
// // };



// // /controllers/media.controller.js
// import { Media } from "../models/media.model.js";
// import { sortTags } from "../utils/tagSorter.js";
// import { uploadMedia } from "../service/cloudinary.js";

// export const createPost = async (req, res) => {
//   try {
//     const user = req.user; // Assuming authentication middleware sets req.user

//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const {
//       title,
//       description,
//       isForSale,
//       price,
//       isAwardWinning,
//     } = req.body;

//     const rawTags = req.body.tags;
//     const tags = rawTags ? JSON.parse(rawTags) : [];

//     const files = req.files || [];

//     // 🔥 Upload all files to Cloudinary (parallel)
//     const uploadPromises = files.map((file) =>
//       uploadMedia(file.path)
//     );

//     const uploadedResults = await Promise.all(uploadPromises);

//     const mediaFiles = uploadedResults
//       .filter(Boolean)
//       .map((file) => ({
//         url: file.secure_url,
//         public_id: file.public_id,
//         type: file.resource_type,
//       }));

//     // safe tags
//     const safeTags = Array.isArray(tags) ? tags : [];
//     const { categoryTags, styleTags, generalTags } =
//       sortTags(safeTags);

//     const newPost = await Media.create({
//       artist: req.user._id,
//       title,
//       description,
//       mediaFiles,
//       categoryTags,
//       styleTags,
//       generalTags,
//       forSale: isForSale,
//       price: isForSale ? price : undefined,
//       isAwarded: isAwardWinning,
//     });

//     res.status(201).json({
//       success: true,
//       data: newPost,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to create post" });
//   }
// };



import { Media }      from "../models/media.model.js";
import { sortTags }   from "../utils/tagSorter.js";
import { uploadMedia } from "../service/cloudinary/media.service.js";
 
export const createPost = async (req, res) => {
  try {
    // ── 1. Auth guard ────────────────────────────────────────────────────
    // req.user is set by authMiddleware. Because we now attach the decoded
    // JWT payload directly (see auth.middleware.js fix), we use _id.
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
 
    // ── 2. Parse body ────────────────────────────────────────────────────
    // When using FormData, req.body fields are strings.
    // tags is sent as JSON.stringify([...]) from the frontend.
    const { title, description, isForSale, price, isAwardWinning } = req.body;
 
    let tags = [];
    try {
      // BUG FIX: wrap JSON.parse in its own try/catch so a malformed
      // tags string doesn't crash the whole handler
      tags = req.body.tags ? JSON.parse(req.body.tags) : [];
      if (!Array.isArray(tags)) tags = [];
    } catch {
      tags = [];
    }
 
    // ── 3. Validate files ────────────────────────────────────────────────
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ message: "At least one media file is required" });
    }
 
    // ── 4. Uplo ad all files to Cloudinary in parallel ────────────────────
    const uploadResults = await Promise.all(
      files.map((file) => uploadMedia(file.path))
    );
 
    // BUG FIX: if EVERY upload returned null (Cloudinary is down / wrong key),
    // bail out with a clear error instead of silently creating an empty post.
    const mediaFiles = uploadResults
      .filter(Boolean)
      .map((r) => ({
        url:       r.secure_url,
        fileKey:   r.public_id,
        type:      r.resource_type,
      }));
 
    if (mediaFiles.length === 0) {
      return res.status(500).json({ message: "All file uploads failed. Check your Cloudinary credentials." });
    }
 
    // ── 5. Sort tags ──────────────────────────────────────────────────────
    const { categoryTags, styleTags, generalTags } = sortTags(tags);
 
    // ── 6. Persist to DB ─────────────────────────────────────────────────
    const newPost = await Media.create({
      artist:       req.user._id,   // ← _id from JWT payload (or DB user)
      title,
      description,
      mediaFiles,
      categoryTags,
      styleTags,
      generalTags,
      forSale:   isForSale === "true" || isForSale === true,
      price:     isForSale ? Number(price) : undefined,
      isAwardWinning: isAwardWinning === "true" || isAwardWinning === true,
    });
 
    return res.status(201).json({ success: true, data: newPost });
 
  } catch (err) {
    console.error("[createPost]", err);
    return res.status(500).json({ message: "Failed to create post", error: err.message });
  }
};