import { configureStore } from "@reduxjs/toolkit";
import pyqSlice from "./Slices/pyqSlice";
import youtubeSlice from "./Slices/youtubeSlice";
import userSlice from "./Slices/userSlice";
import authSlice from "./Slices/authSlice";
import aiSlice from "./Slices/aiSlice";

export const store = configureStore({
    reducer:{
        pyq:pyqSlice,
        youtube:youtubeSlice,
        user:userSlice,
        authUser:authSlice,
        aiSearch:aiSlice
    }
})