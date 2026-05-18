import { Community } from "../models/createCommunity.model.js";
import { uploadCommunityToCloudinary } from "../service/cloudinary/community.service.js";

export const createCommunity = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Please login first" });
        }

        const { name, description, privacy } = req.body;

         if (!name || name.trim() === "") {
            return res.status(400).json({ 
                message: "Community name is required",
                details: "Please provide a valid community name."
            });
        }

        let tags = [];
        try {
            tags = req.body.tags ? JSON.parse(req.body.tags) : [];
            if (!Array.isArray(tags)) tags = [];
        } catch {
            tags = [];
        }

        let rules = [];
        try {
            rules = req.body.rules ? JSON.parse(req.body.rules) : [];
            if (!Array.isArray(rules)) rules = [];
        } catch {
            rules = [];
        }

        if (!req.files || !req.files.logo || req.files.logo.length === 0) {
            return res.status(400).json({ 
                message: "A community logo is required.",
                details: "Please upload a logo file before creating the community."
            });
        }

        let uploadLogo = { url: "", fileKey: "" };
        let uploadCover = { url: "", fileKey: "" }; 

        try {
            // ✅ Upload Logo - now returns object with url & public_id
            const logoFile = req.files.logo[0];
            const logoResult = await uploadCommunityToCloudinary(logoFile.path, "/Community");
            uploadLogo = {
                url: logoResult.secure_url,      // ✅ Now works!
                fileKey: logoResult.public_id    // ✅ Now works!
            };

            // ✅ Upload Cover Image (Optional)
            if (req.files && req.files.coverImage && req.files.coverImage.length > 0) {
                const coverFile = req.files.coverImage[0];
                const coverResult = await uploadCommunityToCloudinary(coverFile.path, "/Community");
                uploadCover = {
                    url: coverResult.secure_url,
                    fileKey: coverResult.public_id
                };
            }
        } catch (uploadError) {
            console.error("Cloudinary Upload Error:", uploadError);
            return res.status(500).json({ 
                message: "Failed to upload images",
                details: uploadError.message 
            });
        }

        // ✅ Create community with properly validated data
        const community = await Community.create({
            creator: userId,
            name,
            description,
            privacyType: privacy || "public",
            rules,
            tags,
            logo: uploadLogo,        // ✅ Has both url & fileKey
            coverImage: uploadCover  // ✅ Has both url & fileKey (or defaults)
        });

        await community.populate("creator", "username name");

        return res.status(201).json({ 
            message: "Community created successfully", 
            community 
        });

    } catch (error) {
        console.error("Create Community Error:", error);
        
        if (error.name === 'ValidationError') {
            const details = Object.entries(error.errors)
                .map(([key, err]) => `${key}: ${err.message}`)
                .join(", ");
            return res.status(400).json({ 
                message: "Validation Error", 
                details 
            });
        }

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};