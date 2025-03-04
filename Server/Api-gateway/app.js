import express from 'express';
import {createProxyMiddleware} from "express-http-proxy"

const SERVER_1 = "http://localhost:3000"
const SERVER_2 = "http://localhost:3001"


const app = express();

app.use("/api/v1/user",createProxyMiddleware({
    target:SERVER_1,
    changeOrigin: true,
    pathRewrite: {
        "^/api/v1/user": ""
    }
}))

