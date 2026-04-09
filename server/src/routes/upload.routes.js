// import express, {Router} from 'express'
// import { upload } from '../middlewares/upload.middleware.js'
// import { createPost } from '../controller/upload.controller.js'
// import authMiddleware from '../middlewares/auth.middleware.js'


// const uploadRoutes = Router()

// uploadRoutes.post (
//     "/create",
//     authMiddleware,
//     upload.array ("media", 10),
//     createPost
// )

// export default uploadRoutes;


import { Router } from "express";
import { upload, multerErrorHandler } from "../middlewares/upload.middleware.js";
import { createPost }   from "../controller/upload.controller.js";
import authMiddleware   from "../middlewares/auth.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
 
const uploadRoutes = Router();
 
uploadRoutes.post(
  "/create",
  authMiddleware,          // 1. verify JWT → attach req.user
  
  upload.array("media", 10), // 2. parse multipart files (max 10)
  createPost,              // 3. upload to Cloudinary + save to DB
  multerErrorHandler       // 4. catch multer-specific errors for THIS route
);
 
export default uploadRoutes;