import express from 'express';
import cors from 'cors';
import pyqRouter from './routes/pyq.routes.js';
import searchRouter from './routes/search.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "accessToken"]
}));

// PYQ ROUTES

app.use("/api/v1/pyq",pyqRouter)

// SEARCh ROUTES

app.use("/api/v1/search",searchRouter)

export {app}