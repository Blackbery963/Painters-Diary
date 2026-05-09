// controller/profile.controller.js
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../service/cloudinary/avatar.service.js";
import { uploadCoverToCloudinary } from "../service/cloudinary/cover.service.js";

export async function getProfile(req, res) {
    try {
        const userId = req.user._id;
        // Fixed typo: -passsword to -password
        const user = await User.findById(userId).select("-password -__v");
        
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            user,
            message: "Profile retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    } 
}

export async function updateProfile(req, res) {
    try {
        const userId = req.user._id;
        
        // Fixed all typos to match exactly what frontend sends and backend expects
        const {
            nickname,
            avatar,
            bio,
            location,
            portfolio,
            website,
            interests,
            profession,
            artStyle,
            instagram,
            linkedin,
            twitter,
            youtube,
            facebook
        } = req.body;

        const update = {};

        // Only add to update object if defined
        if(nickname !== undefined)   update.nickname = nickname;
        if(avatar !== undefined)     update.avatar = avatar;
        if(bio !== undefined)        update.bio = bio;
        if(location !== undefined)   update.location = location;
        if(portfolio !== undefined)  update.portfolio = portfolio;
        if(website !== undefined)    update.website = website;
        if(profession !== undefined) update.profession = profession;
        if(facebook !== undefined)   update.facebook = facebook;
        if(instagram !== undefined)  update.instagram = instagram;
        if(linkedin !== undefined)   update.linkedin = linkedin;
        if(twitter !== undefined)    update.twitter = twitter;
        if(youtube !== undefined)    update.youtube = youtube;
        if(artStyle !== undefined)   update.artStyle = artStyle;

        // Handle stringified interests array
        if (interests) {
            try {
                update.interests = JSON.parse(interests);
            } catch (error) {
                return res.status(400).json({ message: "Invalid interest format" });
            }
        }

        // Handle Profile Image Upload via Cloudinary
        if (req.file) {
            // req.file.path exists because of multer diskStorage
            const imageUrl = await uploadToCloudinary(req.file.path, "Profile/avatar");
            
            if (imageUrl) {
                update.avatar = imageUrl; // Adjust to 'avatar' if your DB schema uses that word
            } else {
                return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
            }
        }

        // Update database (Fixed -_V to -__v)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: update },
            { new: true, runValidators: true }
        ).select("-password -__v");

        if(!updatedUser){
            return res.status(404).json({ message: "Invalid user" });
        }

        res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser
        });

    } catch (error) {
        console.error("Failed to update profile", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// export async function updateCover(req, res) {
//     try {
//         const userId = req.user._id;

//         if (!req.file) {
//             return res.status(400).json({ message: "No image file provided" });
//         }

//         const imageUrl = await uploadCoverToCloudinary(req.file.path, "Profile/cover");

//         if (!imageUrl) {
//              return res.status(500).json({ message: "Failed to upload cover to Cloudinary" });
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { $set: { coverImage: imageUrl } },
//             { new: true }
//         ).select("-password -__v");

//         res.status(200).json({
//             message: "Cover updated successfully",
//             user: updatedUser
//         });

//     } catch (error) {
//         console.error("Cover update error:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }


export async function updateCover(req, res) {
    try {
        const userId = req.user._id;
        let finalImageUrl = null;

        // SCENARIO 1: The user uploaded a custom file from their device
        if (req.file) {
            finalImageUrl = await uploadCoverToCloudinary(req.file.path, "Profile/cover");
            if (!finalImageUrl) {
                return res.status(500).json({ message: "Failed to upload cover to Cloudinary" });
            }
        } 
        // SCENARIO 2: The user selected a default image from the grid (sent as text in req.body)
        else if (req.body.coverImageUrl) {
            finalImageUrl = req.body.coverImageUrl;
        } 
        // SCENARIO 3: They sent neither
        else {
            return res.status(400).json({ message: "No image file or URL provided" });
        }

        // Update the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { coverImage: finalImageUrl } },
            { new: true }
        ).select("-password -__v");

        res.status(200).json({
            message: "Cover updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Cover update error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}