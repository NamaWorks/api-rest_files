const { deleteImgCloudinary } = require("../../utils/delete_img_cloudinary")
const Bike = require("../models/bike_model")
const Maker = require("../models/maker_model")

// const multer= require("multer")


const getBikes = async (req, res, next) => {
    try {
        const allBikes = await Bike
        .find()
        .populate("maker")
        return res.status(200).json(allBikes)
    } catch (err) {
        return res.status(400).json(`error getting all bikes: ${err}`)
    }
}

const postBike = async (req, res, next) => {
    try {
        const newBike = new Bike({
            ...req.body,
            accepted: false
        })

        if (req.file) {
            newBike.image = req.file.path;
          }

        const bikeSaved = await newBike.save()

        return res.status(201).json(bikeSaved)
    } catch (err) {
        return res.status(400).json(`error at postBike: ${err}`)
    }
}

const updateBikeById = async (req, res, next) => {
    try {
        const { id } = req.params
        const originalBike = await Bike.findById(id)
        deleteImgCloudinary(originalBike.image)
        const newBike = new Bike(req.body)
        newBike._id = id
        if(req.file) {newBike.image = req.file.path}
        const updatedBike = await Bike.findByIdAndUpdate(id, newBike, { new: true })
        return res.status(200).json(`updated: ${updatedBike}`)
    } catch (err) {
        return res.status(400).json(`error at updateBike: ${err}`)
    }
}

const removeBikeById = async (req, res, next) => {
    try {
        const { id } = req.params
        const bikeToRemove = await Bike.findByIdAndDelete(id)
        if(bikeToRemove.image){deleteImgCloudinary(bikeToRemove.image)}
        return res.status(200).json(`removed: ${bikeToRemove}`)

    } catch (err) {
        return res.status(400).json(`error at removeBikeById: ${err}`)
    }
}



module.exports = {  getBikes, postBike, updateBikeById, removeBikeById }