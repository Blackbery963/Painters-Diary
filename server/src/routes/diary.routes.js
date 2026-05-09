import {Router} from "express"
import * as diaryController from "../controller/diary.controller.js"
import { upload } from "../middlewares/upload.middleware.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const diaryRouter = Router()

diaryRouter.post(
    "/create-diary",
    authMiddleware,
    upload.array("sketches", 10),  //---- max 10 images ----------
    diaryController.createDiary
)

diaryRouter.get(
    "/get-diary",
    authMiddleware,
    diaryController.getAllDiary
)

diaryRouter.get(
    "/get-user-diary",
    authMiddleware,
    diaryController.getDiaryById
)


export default diaryRouter