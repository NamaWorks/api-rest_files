const Maker = require("../models/maker_model");

const getMakers = async (req, res, next) => {
    try {
        const allMakers = await Maker.find()
        return res.status(200).json(allMakers)
    } catch (err) {
        return res.status(400).json(`error at getMakers: ${err}`)
    }
}

const getMakerByName = async (req, res, next) => {
    try {
        let { makerName } = req.params
        const makerNameUppercase = makerName[0].toUpperCase() + makerName.slice(1)
        const maker = await Maker.find({ makerName : makerNameUppercase })
        return res.status(200).json(maker)
    } catch (err) {
        return res.status(400).json(`error at getMakerByName: ${err}`)
    }
}

const getMakerById = async (req, res, next) => {
    try {

        const { _id } = req.params
        const maker = await Maker.findById(_id)
        return res.status(200).json(maker)
    } catch (err) {
        return res.status(400).json(`error at getMakerById: ${err}`)
    }
}

const postMaker = async (req, res, next) => {
    try {
        const newMaker = new Maker({
            makerName: req.body.makerName,
            country: req.body.country,
            foundationYear: req.body.foundationYear,
            founder: req.body.founder,
            logo: req.body.logo
        })

        const makerDuplicated = await Maker.findOne({makerName: req.body.makerName})
        if(!makerDuplicated){
            const makerSaved = await newMaker.save()
            return res.status(200).json(makerSaved)
        } else { return res.status(400).json(`this maker already exists`)}

    } catch (err) {
        return res.status(400).json(`error at postMaker: ${err}`)
    }
}

const removeMaker = async (req, res, next) => {
    try {
        const { id } = req.params
        const makerToRemove = await Maker.findByIdAndDelete(id)
        return res.status(200).json(`removed: ${makerToRemove}`)
    } catch (err) {
        return res.status(400).json(`error at removeMaker: ${err}`)
    }
}

const updateMaker = async (req, res, next) => {
    try {
        const {id} = req.params
        const newMaker = new Maker(req.body)
        newMaker._id = id
        const updatedMaker = await Maker.findByIdAndUpdate(id, newMaker, { new: true })
        return res.status(200).json(`updated: ${updatedMaker}`)
    } catch (err) {
        return res.status(400).json(`error at updateMaker: ${err}`)
    }
}


module.exports = { getMakers , getMakerByName, getMakerById, postMaker, removeMaker, updateMaker }