import dotenv from 'dotenv';
dotenv.config();
import cloudinary from 'cloudinary';

const cloudinaryModule = cloudinary.v2;
let cloudinaryConfig = () => {
  cloudinaryModule.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export default cloudinaryConfig;
