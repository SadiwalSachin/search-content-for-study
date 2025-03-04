import {Router} from "express"
import { contentGenerateViaGemini ,searchContentOnYoutube } from "../controllers/search.controller.js"
import authUser from "../middlewares/authUser.middleware.js"

const searchRouter = Router()

searchRouter.route("/gemini-ai").post(authUser,contentGenerateViaGemini)
searchRouter.route("/search-on-yt").post(authUser,searchContentOnYoutube)


export default searchRouter