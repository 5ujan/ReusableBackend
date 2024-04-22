const cloudinary = require("cloudinary")
const fs = require("fs-extra")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const getImageUrl = async( req, res, next)=>{
    const file = req.files.photo;
    console.log(file);
    const resp = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "temp"
    });
    
    console.log(resp)
    if(resp) res.json({success:1, file: {
      url:resp.secure_url
    }})
   await fs.remove(file.tempFilePath);

}

const finalImageUrl= async(url)=>{
  try {
    const publicId = url.split("/").pop().split(".")[0];
    // Move the image to the permanent directory
    const result = await cloudinary.uploader.rename(
      `temp/${publicId}`,
      `images/${publicId}`,

    );
   return result.secure_url;

  } catch (error) {
    console.error("Error moving to permanent directory:", error);
  }

}
const emptyTempDirectory = async () => {
  try {
    // Delete all files in the temporary directory
    const response = await cloudinary.api.delete_resources_by_prefix(
      "temp"
    );

    console.log("Temporary directory emptied:", response);
  } catch (error) {
    console.error("Error emptying temporary directory:", error);
    throw error;
  }
};


module.exports = {getImageUrl, finalImageUrl, emptyTempDirectory}