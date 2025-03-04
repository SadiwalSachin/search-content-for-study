import { Router } from "express";
import { addPyq, deletePyq, editPyq, findAllPyq, findEditingPyq } from "../controller/pyqSearch.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const pyqRoute = Router()

pyqRoute.route("/addpyq").post(upload.single("image"),addPyq)
pyqRoute.route("/findallpyq").get(findAllPyq)
pyqRoute.route("/findeditingpyq").post(findEditingPyq)
pyqRoute.route("/editpyq").post( upload.single('image'),editPyq)
pyqRoute.route("/deletepyq").post( deletePyq )



export default pyqRoute