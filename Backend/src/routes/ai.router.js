import { Router } from "express";
import { contentGenerateViaGemini } from "../controller/geminiAi.controller.js";
import searchContentOnYoutube from "../controller/youtubeSerach.controller.js";
import {searchPYQ} from "../controller/pyqSearch.controller.js";

const aiRoute = Router()


aiRoute.post("/gemini-ai" , contentGenerateViaGemini)
aiRoute.post("/search-on-yt",searchContentOnYoutube)
aiRoute.post("/findPyq",searchPYQ)

export default aiRoute