import { User } from "../model/User.model.js";

const generateAccessAndRefreshToken = async (id) => {
  try {
    const user = await User.findById(id);
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error while generating tokens :", error);
    return res.json({
      success: false,
      message: "Some error occured while generating access and refresh token",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    // take data from frontend
    // apply validation
    // search is it user exist
    // is it exist send error
    // create user
    // send user details to frontend

    const { fullName,branch,email,password } = req.body;

    console.log(
      "data coming from user:",
      fullName,
      branch,
      email,
      password
    );

    if (
      [
        fullName,
        branch,
        email,
        password,
      ].some((field) => field === "")
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (!email.includes("@")) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    const existedUser = await User.findOne({email});

    if (existedUser) {
      return res.json({
        success: false,
        message: "User already exist with this email",
      });
    }

    const user = await User.create({
      fullName,
      branch,
      email,
      password,
    });

    if(user){
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user
      });
    }
    
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Some error occured while creating user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, mobileNumber, password } = req.body;

    console.log("Data coming from user for login :", email, mobileNumber);

    if (!(email || mobileNumber)) {
      console.log("Mobile no or email is required");
      return res.json({
        success: false,
        message: "email or mobileNumber is required",
      });
    }

    const user = await User.findOne({
      $or: [{ email, mobileNumber }],
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesnot exist with this email or mobileNumber",
      });
    }

    const isPasswordValid = user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid credentials enter" });
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    console.log(
      "User Logged in successfully this is user details:",
      loggedInUser
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "User loggedIn Successfully",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log("Error occured while logging :", error);
    return res.json({
      success: false,
      message: "Some error occured while Logging",
    });
  }
};

const logOutUser = async (req, res) => {
  try {
    console.log(req.user._id.value);
    console.log("User trying to logout");

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .res.json({ success: true, message: "User logged Out successfully" });
  } catch (error) {
    console.log("Some error occured while logout");
    console.log(error);
    return res.json({
      success: false,
      message: "Some error occured while logout",
      error: error,
    });
  }
};

const getUser = async (req, res) => {
  const findedUser = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  if (!findedUser) {
    return res.json({
      success: false,
      message: "Something went wrong while finding user",
    });
  }

  return res.json({ success: true, message: "User finded", user: findedUser });
};

const updateUserDetials = async (req, res) => {
  try {
    const id = req.user._id;
    const { collegeName, branch, section, semester, mobileNumber } = req.body;

    if([collegeName,branch,section,semester,mobileNumber].some((item)=> item === "")){
      console.log("All fields are required");
      return res.json({success:false,message:"All fields are required"}) 
    }

    const responseUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          collegeName,
          branch,
          section,
          semester,
          mobileNumber,
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");

    if (responseUser) {
      console.log("User details updated successfully");
      console.log("this is updated user :-", responseUser);
      return res
        .status(200)
        .json({
          success: true,
          message: "User details updates successfully",
          user: responseUser,
        });
    } else {
      console.log("Some Internal error occured while updating user details");
      return res
        .status(401)
        .json({
          success: false,
          message: "Some Internal error occured while updating user details",
        });
    }
  } catch (error) {
    console.log("Some error occured while updating user details");
    console.log(error);
    return res
      .status(401)
      .json({
        success: false,
        message: "Some error occured while updating user details",
        error,
      });
  }
};

export {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  updateUserDetials
};
