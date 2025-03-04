import { Router } from "express";
import { addPyq, deletePyq, findAllPyq } from "../controllers/pyq.controller.js";
import authUser from "../middlewares/authUser.middleware.js";

const pyqRouter =  Router()

pyqRouter.route("/add-pyq").post(authUser,addPyq)
pyqRouter.route("/get-pyqs").get(authUser,findAllPyq)
pyqRouter.route("/delete-pyq").post(authUser,deletePyq)

export default pyqRouter