import { Router } from "express";
import * as twofaController from '../controller/twofa.controller.js'
import authMiddleware from "../middlewares/auth.middleware.js";

const twofaRoutes = Router()

//post /api/2fa/setup2fa
twofaRoutes.post("/setup2fa", authMiddleware, twofaController.setup2fa)

//post /api/2fa/verify2fa
twofaRoutes.post ("/verify2fa", authMiddleware, twofaController.verify2fa)

export default twofaRoutes;