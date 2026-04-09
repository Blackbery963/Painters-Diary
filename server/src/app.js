import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js';
import twofaRoutes from './routes/twofa.routes.js'
import uploadRoutes from './routes/upload.routes.js';
import { multerErrorHandler } from './middlewares/upload.middleware.js';

const app = express ();

app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin:{
        "http://localhost:5173": true,
        "http://localhost:3000": true
    },
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:" 16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// app.get("/", (req, res) => res.send("Api working fine "))

app.use("/api/auth", authRouter)

app.use("/api/2fa", twofaRoutes)

app.use(multerErrorHandler)

app.use("/api/upload", uploadRoutes)



export default app;
    