import jwt from "jsonwebtoken"
import fs from "fs"
import { fileURLToPath } from "url";
import path , {dirname} from "path";

const __filename  = fileURLToPath(import.meta.url)
const __dirname =  dirname(__filename)

const PUBLIC_KEY = fs.readFileSync(path.join(__dirname , "../../public.pem"),"utf8")
// console.log(PUBLIC_KEY);


export default async function authUser(req, res, next) {
    try {
        const incomingToken = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        
        // console.log("Incoming Token",incomingToken);
        
        if(!incomingToken){
            return res.status(401).json({success:false,message:"Unauthorized request"})
        }

        const decodedToken = jwt.verify(incomingToken, PUBLIC_KEY , {algorithms:["RS256"]})
        // console.log("decoded token: " + decodedToken);

        req.user = decodedToken?._id

        next()
    } catch (error) {
        // console.log("Error while verifying JWT Token in auth middleware")
        // console.log(error)
        return res.json({success:false,message:"Token verification failed"})
    }
}