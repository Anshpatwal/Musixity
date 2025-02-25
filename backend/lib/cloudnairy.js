const cloudinary = require('cloudinary').v2;
const dotEnv = require('dotenv')
dotEnv.config()

// Configuration

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

module.exports = cloudinary