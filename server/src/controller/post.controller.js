import { Media } from "../models/media.model.js";

export const getUserPosts = async (req, res) => {
    try {
        // 1. Safety check to ensure req.user exists before reading _id
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const userId = req.user._id;

        // 2. Change { user: userId } to { artist: userId } to match your schema
        const media = await Media.find({ artist: userId }).sort({ createdAt: -1 });
        
        res.json(media);
        
    } catch (error) {
        console.error("Error in getUserPosts:", error); // Logs to your backend terminal
        res.status(500).json({
            message: "Failed to fetch posts",
            error: error.message
        });
    }
}