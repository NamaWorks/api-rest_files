const cloudinary = require('cloudinary').v2;

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

module.exports = { deleteImgCloudinary }