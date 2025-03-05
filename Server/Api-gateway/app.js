import express from 'express';
import {createProxyMiddleware} from "express-http-proxy"

const SERVER_1_USER = "https://search-content-user-service.onrender.com"
const SERVER_2_PYQ = "https://search-content-pyq-service.onrender.com"


const app = express();

app.use("/api/v1/user",createProxyMiddleware({
    target:SERVER_1_USER,
    changeOrigin: true,
    pathRewrite: {
        "^/api/v1/user": ""
    }
}))

app.use("/api/v1/pyq",createProxyMiddleware({
    target:SERVER_2_PYQ,
    changeOrigin: true,
    pathRewrite: {
        "^/api/v1/user": ""
    }
}))


