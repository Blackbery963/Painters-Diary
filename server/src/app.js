import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js';
import twofaRouter from './routes/twofa.routes.js'
import postRouter from './routes/post.routes.js';
import profileRouter from './routes/profile.routes.js';
import diaryRouter from './routes/diary.routes.js';
import communityRouter from './routes/community.routes.js';

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

// for all types of authentication routes, we can add it here when we have the controller and routes ready
app.use("/api/auth", authRouter)

// for two factor authentication routes, we can add it here when we have the controller and routes ready
app.use("/api/2fa", twofaRouter)

//for post routes and we can add it here when we have the controllr and the routes ready
app.use("/api/post", postRouter)

// for two profile factor routes, we can add it here when we have the controller and routes ready
app.use("/api/profile", profileRouter)

// for diary routes, we can add it here when we have the controller and routes ready
app.use("/api/diary", diaryRouter)

app.use("/api/community", communityRouter)


export default app;
    