import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://searchcontentandpyq.onrender.com",
      "http://localhost:5173",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "accessToken"],
  })
);

// CSP HEADER MIDDLEWARE
app.use((req, res, next) => {
  // Set CSP directives (adjust based on your needs)
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; img-src 'self' https://your-cloudinary-domain.com data:; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com; object-src 'none'; frame-ancestors 'none';"
  );
  next();
});


// Generate Route
import aiRoute from "./routes/ai.router.js";

//pyq Route
import pyqRoute from "./routes/pyq.router.js";

app.use("/pyq", pyqRoute);

app.use("/prompt", aiRoute);

// User Route
import userRoute from "./routes/user.router.js";

app.use("/user", userRoute);

// Notes Route

import { notesRoute } from "./routes/notes.router.js";
import { User } from "./model/User.model.js";

app.use("/notes", notesRoute);

export default app;
