const { upload } = require("../../middlewares/files.middlewares")
const { isAdmin } = require("../../middlewares/is-admin")
const { isAuth } = require("../../middlewares/auth")
const { getBikes, postBike, updateBikeById, removeBikeById } = require("../controllers/bike_controller")
const Maker = require("../models/maker_model")

const bikesRouter = require("express").Router()

bikesRouter.get("/all", getBikes)
bikesRouter.post("/", [isAuth], upload.single("image"), postBike)
bikesRouter.put("/id/:id", [isAdmin], upload.single("image"), updateBikeById)
bikesRouter.delete("/id/:id",[isAdmin], removeBikeById)
bikesRouter.get("/", async(req, res, next)=> {
        try {
            const makers = await Maker.find().populate('makers')
            console.log(makers)
            return res.status(200).json(makers)
        } catch (err) {
            return next(err)
        }

})

module.exports = bikesRouter
