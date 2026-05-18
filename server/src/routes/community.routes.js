import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import * as communityController from '../controller/community.controller.js'
import authMiddleware from "../middlewares/auth.middleware.js";

const communityRouter = Router();

communityRouter.post(
    "/create-community",
    upload.fields([
        {name: "logo", maxCount: 1},
        {name: "coverImage", maxCount: 1}
    ]),
    authMiddleware,
    communityController.createCommunity
)

export default communityRouter;