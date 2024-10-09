import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'publications',  // Folder to store the files
      resource_type: 'auto',  // This automatically detects and sets the correct type (image, raw, video, etc.)
      allowed_formats: ['jpg', 'png', 'pdf'],  // Allow specific file types
    },
  });
  

export { cloudinary, storage };