import express from 'express';
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "accessToken"]
}))

// ROUTES

import userRouter from './routes/user.routes.js';

app.use("/api/v1/user",userRouter)

export {app}