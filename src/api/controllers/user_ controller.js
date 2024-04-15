const { deleteImgCloudinary } = require("../../middlewares/files.middlewares");
const { generateSign } = require("../../utils/jwt");
const User = require("../models/user_model");
const bcrypt = require("bcrypt")

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (err) {
        return res.status(400).json(`error at getUsers: ${err}`)
    }
}

const userSignUp = async (req, res, next) => {
    try {
        const newUser = new User({
            ...req.body,
            accepted: false
        })
        if(req.file){
            newUser.image = req.file.path
        }
        const userDuplicated = await User.findOne({email : req.body.email})
            if(userDuplicated){return res.status(400).json(`that email is already in use`)}

            const userSaved = await newUser.save()

            return res.status(201).json(userSaved)
    } catch (err) {
        return res.status(400).json(`error at userSignUp: ${err}`)
    }
}

const userLogin = async (req, res, next) => {
    try {
        // const userName = await User.findOne({userName : req.body.userName})
        const userMail = await User.findOne({email : req.body.email})

        if(userMail){
            if(bcrypt.compareSync(req.body.password, userMail.password)) {
                const token = generateSign(userMail._id)
                return res.status(200).json({ userMail, token})
            } else {
                return res.status(400).json(`user or passwor are incorrect`)
            }
        } else {
            return res.status(400).json(`user or password are not correct`)
        }

    } catch (err) {
        return res.status(400).json(`error at userLogin: ${err}`)
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params
        const userDeleted = await User.findByIdAndDelete(id)
        if(userdeleted.image){deleteImgCloudinary(userdeleted.image)}
        return res.status(200).json(`user deleted: ${userDeleted}`)
    } catch (err) {
        return res.status(400).json(`error at deleteUserById: ${err}`)
    }
}

const updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params

        const newUser = new User(req.body)
        newUser._id = id

        if(newUser.image){
            const userToUpdate = await User.findById(id)
            const { image } = userToUpdate
            deleteImgCloudinary(image)
            newUser.image = req.file.path
        }

        const updatedUser = await User.findByIdAndUpdate(id, newUser, {new:true})
        return res.status(200).json(updatedUser)
    } catch (err) {
        return res.status(400).json(`error at updateUserById: ${err}`)
    }
}

module.exports = { getUsers , userLogin, userSignUp, deleteUserById, updateUserById}