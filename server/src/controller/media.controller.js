// /controllers/media.controller.js
import { Media } from "../models/media.model.js";
import {sortTags} from "../utils/tagSorter.js"

export const createPost = async (req, res) => {
    try {
        // 1. Extract data from the frontend request
        // 'tags' here is the single array: e.g., ["portrait", "travel", "my hostel room"]
        const { title, description, tags, isForSale, price, isAwardWinning } = req.body;
        
        // *Note: We will handle mediaFiles (Backblaze URLs) separately*
        const mediaFiles = req.body.mediaFiles || []; 

        // 2. MAGIC HAPPENS HERE: Sort the unified tags array
        const { categoryTags, styleTags, generalTags } = sortTags(tags);

        // 3. Save to MongoDB
        const newPost = await Media.create({
            artist: req.user._id, // Assuming you have authentication middleware setting req.user
            title,
            description,
            mediaFiles,
            
            // Pass the newly sorted arrays
            categoryTags,
            styleTags,
            generalTags,
            
            forSale: isForSale,
            price: isForSale ? price : undefined,
            isAwarded: isAwardWinning
        });

        return res.status(201).json({
            success: true,
            message: "Masterpiece published successfully!",
            data: newPost
        });

    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to publish post",
            error: error.message
        });
    }
};