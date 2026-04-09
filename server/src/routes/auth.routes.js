import {Router} from 'express'
import * as authController from "../controller/auth.controller.js"

const authRouter = Router()
 
// post /api/auth/register
authRouter.post("/register", authController.register)

//post /api/auth/verify-email
authRouter.post("/verify-email", authController.verifyEmail)

//post /api/auth/resendOTP
authRouter.post("/resend-otp", authController.resendOTP)

//get /api/auth/getUser
authRouter.get("/user", authController.getUser)

//post /api/auth/refresh-token
authRouter.post("/refresh-token", authController.refreshToken)

//post /api/auth/login
authRouter.post("/login", authController.login);

//post /api/auth/lohout
authRouter.post("/logout", authController.logout)

export default authRouter;
