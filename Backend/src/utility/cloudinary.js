import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dyrjduvij",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
});

const fileUploadOnCloudinary = async (localFilePath) => {
  try {
    if(!localFilePath){
      return null
    }
    // file upload on cloudinary
    const result = await cloudinary.uploader.upload(localFilePath ,{ 
      resource_type:"auto"
     })
    if(result){
      console.log("File uploaded on cloudinary :" , result.url);
      // removing locally saved temprory file if file get uploaded successfully
      fs.unlinkSync(localFilePath);
      return result
    }

  } catch (error) {
    console.log("File not uploaded on cloudinary some error occured",error);
      // removing locally saved temprory file after getting some error
    fs.unlinkSync(localFilePath);
    return null
  }
}

export {fileUploadOnCloudinary}
