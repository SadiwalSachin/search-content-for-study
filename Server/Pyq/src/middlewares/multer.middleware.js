import multer from "multer";
import path from "path"
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
  destination:function(req,file,cb){
    // console.log("file has reached at multer middleware");
     cb(null,path.join(__dirname , ".." ,".." , "public"))
  },
  filename:function(req,file,cb){
     cb(null , file.originalname)
  }
})

export const upload = multer({storage})
