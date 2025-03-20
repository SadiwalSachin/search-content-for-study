import { Router } from "express";
import { addPyq, addSolutionForRaisedPyq, deletePyq, findAllPyq, getAllRaisedPyq, getSolution, raisePyqForSolution } from "../controllers/pyq.controller.js";
import authUser from "../middlewares/authUser.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const pyqRouter =  Router()

pyqRouter.route("/add-pyq").post(addPyq)
pyqRouter.route("/get-pyqs").get(authUser,findAllPyq)
pyqRouter.route("/delete-pyq").post(authUser,deletePyq)
pyqRouter.route("/raise-pyq-for-solution").post(authUser,raisePyqForSolution)
pyqRouter.route("/get-raised-pyq").get(authUser,getAllRaisedPyq)
pyqRouter.route("/add-pyq-solution").post(authUser,upload.single("solutionImage"),addSolutionForRaisedPyq)
pyqRouter.route("/get-solution").get(authUser,getSolution)

export default pyqRouter