require("dotenv").config()
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const configCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_API_NAME,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        api_key: process.env.CLOUDINARY_API_KEY
    })
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "12_RTC_P12_API-REST-FILES",
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
    }
})

const upload = multer({ storage })

module.exports = { upload, configCloudinary }