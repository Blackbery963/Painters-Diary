import { Router } from "express";
import * as twofaController from '../controller/twofa.controller.js'
import authMiddleware from "../middlewares/auth.middleware.js";

const twofaRouter = Router()

//post /api/2fa/setup2fa
twofaRouter.post("/setup2fa", authMiddleware, twofaController.setup2fa)

//post /api/2fa/verify2fa
twofaRouter.post ("/verify2fa", authMiddleware, twofaController.verify2fa)

export default twofaRouter;