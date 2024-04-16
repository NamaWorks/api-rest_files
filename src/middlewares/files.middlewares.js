const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "12_RTC_P12_API-REST-FILES",
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
    }
})

const deleteImgCloudinary = (imgUrl) => {
    console.log(imgUrl)
    const imgSplited = imgUrl.split('/')
    const nameSplited = imgSplited[imgSplited.length - 1].split('.')
    const folderSplited = imgSplited[imgSplited.length - 2]
    const public_id = `${folderSplited}/${nameSplited[0]}`;
    cloudinary.uploader.destroy(public_id, () => {
        console.log(public_id)
        console.log('Image deleted in cloudinary')
    })
}

const upload = multer({ storage })

module.exports = { upload , deleteImgCloudinary }