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

const postBike = async (err, req, res, next) => {
    if (err) {
        res.status(500).json({ error: err.message });
    } else {   
    try {
        const newBike = new Bike(
        {
            ...req.body,
            img: req.image ? req.file.path : 'no image'
        }
        )

        const bikeSaved = await newBike.save()
        return res.status(201).json(bikeSaved)
    } catch (err) {
        return res.status(400).json(`error at postBike: ${err}`)
        // console.log(`1234`)
    }
}
}





module.exports = { bikesPong , getBikes, postBike }