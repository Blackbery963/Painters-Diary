import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import * as communityController from '../controller/community.controller'
import authMiddleware from "../middlewares/auth.middleware";

const communityRouter = Router();

communityController.post(
    "/create-community",
    upload.fields([
        {name: "logo", maxCount: 1},
        {name: "coverImage", maxCount: 1}
    ]),
    authMiddleware,
    communityController.createCommunity
)

export default communityRouter;