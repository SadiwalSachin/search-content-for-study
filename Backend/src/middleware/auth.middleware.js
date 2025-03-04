import jwt from "jsonwebtoken"
import { User } from "../model/User.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const incomingToken = req.header("Authorization")?.replace("Bearer ","")
        
        console.log(incomingToken);
        
        if(!incomingToken){
            return res.json({success:false,message:"Unauthorized request"})
        }

        const decodedToken = jwt.verify(incomingToken,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            return res.json({success:false,message:"Invalid access token"})
        }

        req.user = user
        
        next()
    } catch (error) {
        console.log("Error while verifying JWT Token in auth middleware")
        console.log("Error",error)
        return res.json({success:false,message:"Invalid access token"})
    }
};
