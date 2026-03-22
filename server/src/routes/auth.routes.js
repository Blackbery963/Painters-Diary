import {Router} from 'express'
import * as authController from "../controller/register.controller.js"

const authRouter = Router()
 
authRouter.post("/register", authController.register)

export default authRouter;
