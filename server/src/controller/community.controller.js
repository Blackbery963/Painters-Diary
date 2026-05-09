import { Community } from "../models/createCommunity.model";
import { uploadCommunityToCloudinary } from "../service/cloudinary/community.service";


export const createCommunity = async (req, res) =>{
    try {
        const userId = req.user?._id;
        if(!userId){
            return res.status(401).json({message: "Unauthorized. Please login first"})
        }


            const {
                title,
                description,
                privacy,
            } = req.body

        let tags = [];
        try{
            tags = req.body.tags ? JSON.parse(req.body.tags) : [];
            if(!Array.isArray(tags)) tags = []
        }catch{
            tags = []
        }

        let rules = [];
        try{
            rules = req.body.rules ? JSON.parse(req.body.rules) : [];
            if(!Array.isArray(rules)) rules = []
        }catch{
            rules = []
        }

        //upload logo 
        let uploadLogo = "";
        let uploadCover = ""

        //handle logo if user upload directly from create community page
        if(req.files && req.files.logo){
            const logoFile = req.files.logo[0]
            const logoResult = await uploadCommunityToCloudinary(logoFile.path, "/Community");

            const logoUrl = typeof logoResult === "string" ? logoResult : logoResult?.secure_url;
            if (logoUrl) {
                uploadLogo = logoUrl
            }
        };


        if(req.file){
            const coverFile = req.files.coverImage[0]
            const coverResult = await uploadCommunityToCloudinary(coverFile.path, "/Community");
            const coverUrl = typeof coverResult =="string" ? coverResult : coverResult?.secure_url;

            if(coverUrl){
                uploadCover = coverUrl
            }

        }

        const community = await Community.create({
            creator: userId,
            title,
            description,
            privacy,
            rules,
            tags,
            logo:uploadLogo,
            coverImage: uploadCover
        })

        await community.populate("creator", "username name")
        
        return res.status(201).json({message:"Community created successfulle", community})
    } catch (error) {
    console.error("Create Community Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
    }
}
