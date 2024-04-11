const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

require("dotenv").config()


const storage = new CloudinaryStorage({
    resource_type: "auto",
    cloudinary: cloudinary,
    folder: "bikes",
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],

})

const upload = multer({ storage })

const deleteImgCloudinary = (imgUrl) => {
    const imgSplitted = imgUrl.split("/")
    const nameSplitted = imgSplitted[imgSplitted.length -1].split('.')
    const folderSplited = imgSplitted[imgSplitted.length -2]
    const publicId = `${folderSplited}/${nameSplitted[0]}`

    cloudinary.uploader.destroy(publicId, () => {
        console.log(`image deleted in Cloudinary`)
    })
}

const configCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_API_NAME,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        api_key: process.env.CLOUDINARY_API_KEY,
    })
}

module.exports = { upload , deleteImgCloudinary, configCloudinary}