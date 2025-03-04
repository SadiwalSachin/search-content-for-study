import { Router } from "express";
import {
  getUser,
  loginUser,
  logOutUser,
  registerUser,
  updateUserDetials,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const userRoute = Router();

userRoute.route("/registeruser").post(registerUser);
userRoute.route("/loginuser").post(loginUser);

//Secured route
userRoute.route("/logoutuser").post(verifyJWT, logOutUser);
userRoute.route("/getuser").post(verifyJWT, getUser);
userRoute.route("/updateuserdetails").post(verifyJWT, updateUserDetials);

// google login route

// userRoute.route("/login/success").post(getUserDetailsAfterGoogleLogin);

export default userRoute;
