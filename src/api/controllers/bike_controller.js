const Bike = require("../models/bike_model")

const bikesPong = (req, res, next) => {
        return res.status(200).json(`pong`)
}

const getBikes = async (req, res, next) => {
    try {
        const allBikes = await Bike.find()
        return res.status(200).json(allBikes)
    } catch (err) {
        return res.status(400).json(`error getting all bikes: ${err}`)
    }
}

module.exports = { bikesPong , getBikes }