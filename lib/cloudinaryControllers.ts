import {v2} from "cloudinary"
import fs from "fs";

v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const extractPubliId = (URL:string)=>{
    const splited = String(URL).split('/');
    const fileName = splited[splited.length-1];
    return fileName.split(".")[0]
}

const uploadOnCloudinary = async (localFilePath:string,PresentURL=null)=>{
    try {
        if(!localFilePath) return null

        if(PresentURL){
            await deleteFromCloudinary(PresentURL);
            console.log("Deletion successful");
        }

        const uploadResponse = await v2.uploader.upload(localFilePath,{
            resource_type:"auto",
            folder:"e_learning/files"
        })
        console.log("File uploaded to cloudinary successfully.");
        
        if(fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

        return uploadResponse;
    } catch (error) {
        console.log("Failed upload due to :->");
        console.log(error);
        fs.unlinkSync(localFilePath);
    }
}

const deleteFromCloudinary = async(FullURL:string)=>{
    try {
        if (!FullURL){
            return null
        }

        const DeleteResponse = await v2.uploader.destroy(extractPubliId(FullURL))
        console.log("Deletion success");
        console.log(DeleteResponse);
        
        return DeleteResponse
    } catch (error) {
        return {error,message:"Something went wrong while deleting."}
    }
}

export {uploadOnCloudinary,deleteFromCloudinary};