import {Router} from 'express'
import * as authController from "../controller/auth.controller.js"

const authRouter = Router()
 
// post /api/auth/register
authRouter.post("/register", authController.register)

//get /api/auth/getUser
authRouter.get("/user", authController.getUser)

// get /api/auth/refrsh-token
authRouter.get("/refresh-token", authController.refreshToken)

//post /api/auth/login
authRouter.post("/login", authController.login);

//post /api/auth/verify-email
authRouter.post("/verify-email", authController.verifyEmail)

//post /api/auth/resendOTP

authRouter.post("/resend-otp", authController.resendOTP)


export default authRouter;
