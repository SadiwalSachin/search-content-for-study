import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRECT,
})

const fileUploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null
        }

        const result = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        if(result){
            console.log(`File uploaded on cloudinary`);
            // removing locally saved temporary file if file get uploaded
            fs.unlinkSync(localFilePath)
            return result
        }
        
    } catch (error) {
        console.log(`Some error occured while uploading the file on cloudinary ${error}`);
        fs.unlinkSync(localFilePath)
        return error
    }
}

export default fileUploadOnCloudinary