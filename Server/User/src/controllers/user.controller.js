import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PRIVATE_KEY = fs.readFileSync(
  path.join(__dirname, "../../private.pem"),
  "utf8"
);

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user?._id,
      email: user?.email,
    },
    PRIVATE_KEY,
    { algorithm: "RS256", expiresIn: "3d" }
  );
};

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("Error in validation", errors);
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);

    const { fullName, branch, email, password } = req.body;

    // console.log("data coming from user:", fullName, branch, email, password);

    const existedUser = await User.findOne({ email });

    // console.log(existedUser);

    if (existedUser) {
      // console.log("user already exists");
      return res.json({
        success: false,
        message: "User already exist with this email",
      });
    }

    const newUser = await User.create({
      fullName,
      branch,
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    // console.log(error);
    return res.json({
      success: false,
      message: "Some error occured while creating user",
      error
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log("Error in login validation", errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // console.log("Data coming from user for login :", email, password);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesnot exist with this email",
      });
    }

    const isPasswordCorrect = user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials entered",
      });
    }

    const token = generateToken(user);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("accessToken", token, options).json({
      success: true,
      message: "User logged in successfully",
      user: user,
      token,
    });
  } catch (error) {
    // console.log("Error while logging in", error);
    return res.status(400).json({ error });
  }
};

const logoutUser = async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", "", options)
    .json({ success: true, message: "User logged out successfully" });
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized request" });
    }
    return res.status(200).json({ success: true,message:"Successfully fetched user details" , user });
  } catch (error) {
    // console.log("Error getting user details", error);
    return res
      .status(400)
      .json({ success: false, message: "Unauthorized request" , error});
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user;

    // console.log("req.body",req.body);

    const updateFields = {};

    const allowFields = ["fullName", "email,branch", "semester", "collegeName"];

    allowFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    const updateUserDetails = await User.findByIdAndUpdate(
      userId,
      {
        $set: updateFields,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success:true,
      message:"User details updated !!!",
      data:updateUserDetails
    })

  } catch (error) {
    // console.error('Error updating user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating user details',
      error: error 
    });
  }
};
export { registerUser, loginUser, logoutUser, getUserDetails , updateUserDetails };
