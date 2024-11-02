import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name:  process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:  process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_API_SECRET,
    secure: true,
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return `This path is ${null}`
        //Upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })
        // File uploaded successfully
        console.log(`File is uploaded on cloudinary ${response.url}`);
        // fs.unlink(localFilePath)
        // Check if file exists before deleting
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        } else {
            console.warn(`File not found at path: ${localFilePath}`);
        }

        return response
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error(`Cloudinary upload failed: ${error.message}`);
        return null
    }
}


export { uploadOnCloudinary };