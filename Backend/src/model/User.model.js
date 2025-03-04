import mongooose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongooose.Schema(
  {
    googleId: {
      type: String,
      required: function () {
        return !this.password;
      },
    },
    fullName: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    branch: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    section: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    semester: {
      type: Number,
      required: true,
      required: function () {
        return !this.googleId;
      },
    },
    mobileNumber: {
      type: Number,
      required: function () {
        return !this.googleId;
      },
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      select:false,
      required: function () {
        return !this.googleId;
      },
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongooose.model("User", userSchema);
