import { Router } from "express";
import { getUserDetails, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {body , validationResult} from "express-validator"
import authUser from "../middlewares/authUser.middleware.js";

const userRouter = Router()

userRouter.route("/register").post([
    body("fullName").notEmpty().withMessage("fullName is required"),
    body("branch").notEmpty().withMessage("branch is required"),
    body("email").isEmail().withMessage("email is required"),
    body("password").isLength({min: 6}).withMessage("password must be at least 6 characters long"),
],registerUser)

userRouter.route("/login").post([
    body("email").isEmail().withMessage("email is required"),
    body("password").isLength({min: 6}).withMessage("password must be at least 6 characters long"),
],loginUser)

userRouter.route("/logout").post(logoutUser)

userRouter.route("/get-user-details").get(authUser,getUserDetails)
userRouter.route("/verify-token").post(authUser)

export default  userRouter