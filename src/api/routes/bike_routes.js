const upload = require("../../middlewares/files.middlewares")
const { bikesPong, getBikes, postBike } = require("../controllers/bike_controller")
const Maker = require("../models/maker_model")

const bikesRouter = require("express").Router()

bikesRouter.get("/all", getBikes)
bikesRouter.get("/ping", bikesPong)
bikesRouter.post("/new", upload.single("image"), postBike)
bikesRouter.get("/", async(req, res, next)=> {
        try {
            const makers = await Maker.find().populate('maker')
            console.log(makers)
            return res.status(200).json(makers)
        } catch (err) {
            return next(err)
        }
})

module.exports = bikesRouter
