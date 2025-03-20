import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },
      collegeName: {
        type: String,
      },
      branch: {
        type: String,
        required: true
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
        required: true,
      },
      refreshToken: {
        type: String,
      },
      semester:{
        type:String
      }
    },
    { timestamps: true }
);

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.pre("save",async function(next){
  if(!this.isModified('password')){
    return next()
  }
  this.password = await bcrypt.hash(this.password,10)
  next()
})

export const User = mongoose.model('User',userSchema)