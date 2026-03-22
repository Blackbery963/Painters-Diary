import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js';

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

export default app;
    