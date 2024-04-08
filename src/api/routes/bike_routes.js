const { bikesPong, getBikes } = require("../controllers/bike_controller")
const Maker = require("../models/maker_model")

const bikesRouter = require("express").Router()

bikesRouter.get("/all", getBikes)
bikesRouter.get("/ping", bikesPong)
bikesRouter.get("/", async(req, res, next)=> {
        try {
            const makers = await Maker.find().populate('makers')
            return res.status(200).json(makers)
        } catch (err) {
            return next(err)
        }
})

module.exports = bikesRouter
