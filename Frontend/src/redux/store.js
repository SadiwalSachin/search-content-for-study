import { configureStore } from "@reduxjs/toolkit";
import pyqSlice from "./Slices/pyqSlice";
import youtubeSlice from "./Slices/youtubeSlice";
import userSlice from "./Slices/userSlice";
import authSlice from "./Slices/authSlice";
import aiSlice from "./Slices/aiSlice";
import  raisePyqSlice  from "./Slices/raisedPyqSlice";

import {persistStore , persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit";



const rootReducer = combineReducers({
    pyq:pyqSlice,
    youtube:youtubeSlice,
    user:userSlice,
    authUser:authSlice,
    aiSearch:aiSlice,
    raisedPyq:raisePyqSlice,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist:["user"]
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer})
export const persistor = persistStore(store)