// import { Router } from "express";
// import * as profileController from "../controller/profile.controller.js"
// import authMiddleware from "../middlewares/auth.middleware.js";
// import multer from "multer"


// const upload = multer({Storage: multer.memoryStorage()})

// const profileRouter = Router()

// profileRouter.post("/update-cover", authMiddleware, profileController.updateCover)

// profileRouter.get("/get-profile", authMiddleware,  profileController.getProfile)

// profileRouter.put("/update-profile",authMiddleware, upload.single("profileImage"), profileController.updateProfile)


// export default profileRouter;


// routes/profile.routes.js
import { Router } from "express";
import * as profileController from "../controller/profile.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

// Import the specific upload middleware you created
import { upload } from "../middlewares/upload.middleware.js";

const profileRouter = Router();

profileRouter.post("/update-cover", authMiddleware, upload.single("coverImage"), profileController.updateCover);

profileRouter.get("/get-profile", authMiddleware, profileController.getProfile);

// Apply the diskStorage upload middleware here
profileRouter.put(
  "/update-profile",
  authMiddleware, 
  upload.single("profileImage"), 
  profileController.updateProfile
);

export default profileRouter;