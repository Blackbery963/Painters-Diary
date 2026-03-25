import {Router} from 'express'
import * as authController from "../controller/register.controller.js"

const authRouter = Router()
 
// post /api/auth/register
authRouter.post("/register", authController.register)

//get /api/auth/getUser
authRouter.get("/user", authController.getUser)

// get /api/auth/refrsh-token
authRouter.get("/refresh-token", authController.refreshToken)

//post /api/auth/login
authRouter.post("/login", authController.login);

export default authRouter;
