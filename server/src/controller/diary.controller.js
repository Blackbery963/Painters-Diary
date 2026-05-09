import { Diary } from "../models/diary.model.js";
import { uploadDiaryToCloudinary } from "../service/cloudinary/diary.service.js";

export const createDiary = async (req, res) => {
  try {
    const userId = req.user?._id;

    // ✅ Auth check
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized. Please login first."
      });
    }

    const {
      diaryType,
      title,
      description,
      vibe,
      location,
      weather,
      travelDate,
      season,
    } = req.body;

    // ✅ Tags parsing
    let tags = [];
    try {
      tags = req.body.tags ? JSON.parse(req.body.tags) : [];
      if (!Array.isArray(tags)) tags = [];
    } catch {
      tags = [];
    }

    // ✅ File validation
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({
        message: "At least one image is required"
      });
    }

    // ✅ Upload images
    const uploadedImages = [];

    // for (const file of files) {
    //   const result = await uploadDiaryToCloudinary(file.path, "/Diary");
    //   const imageUrl = typeof result === 'string' ? result : (result?.secure_url || result?.url);
    //   if (imageUrl) {
    //     uploadedImages.push(result.imageUrl);
    //   }
    // }

    // if (uploadedImages.length === 0) {
    //   return res.status(500).json({
    //     message: "Image upload failed"
    //   });
    // }
    
    for (const file of files) {
      const result = await uploadDiaryToCloudinary(file.path, "Diary");
      
      // FIX: Check if 'result' is already a string URL, or extract it if it's an object
      const imageUrl = typeof result === 'string' ? result : result?.secure_url;
      
      if (imageUrl) {
        uploadedImages.push(imageUrl);
      }
    }

    if (uploadedImages.length === 0) {
      return res.status(500).json({
        message: "Image upload failed. Could not parse URL from Cloudinary."
      });
    }

    // ✅ Save to DB (IMPORTANT — no early return before this)
    const diary = await Diary.create({
      author: userId,
      diaryType,
      title,
      description,
      vibe,
      location,
      weather,
      travelDate,
      season,
      tags,
      sketches: uploadedImages,
    });

    await diary.populate("author", "username name")

    return res.status(201).json({
      message: "Diary created successfully",
      diary
    });

  } catch (error) {
    console.error("Create Diary Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

export const  getAllDiary = async (req, res) => {
    try {
        const userId = req.user?._id
        if(!userId){
          throw new Error ("Unauthorized. Please login ");
        }

        const diary = await Diary.find({author: userId}).sort({createdAt: -1}).populate("author", "username name ")
        res.json(diary)

    } catch (error) {
        console.error("Error in getUserPosts:", error); // Logs to your backend terminal
        res.status(500).json({
        message: "Failed to fetch diaries",
        error: error.message
        });
    }
}

export const getDiaryById = async (req, res) => {
    try {
        const {id} = req.params;
        const diary = await Diary.findById(id).populate("author", "username name");
        if(!diary){
          // throw new Error ("")
          res.status(404).json({message: "Diary entry not found"})
        }
        return res.status(200).json(diary)

    } catch (error) {
        console.error("Error fetching diary by ID:", error);
        
        // Handle invalid MongoDB Object IDs gracefully
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ message: "Invalid diary ID format." });
        }

        return res.status(500).json({
            message: "Failed to fetch the diary entry.",
            error: error.message
        });
    }
}


export const deleteDiary = async (req, res ) => {
    try {
        
    } catch (error) {
        
    }
}