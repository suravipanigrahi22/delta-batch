const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
 cloudinary.config({//define env varibles from .env file
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})//Configuration part of clodinary

 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',//file name where we store
     allowedFormat:[ 'png',"jpg","jpeg"] // which type of file we allowed
    },
  });

  module.exports={
    cloudinary,
    storage,
  };