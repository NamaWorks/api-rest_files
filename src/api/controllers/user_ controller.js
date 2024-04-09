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
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            profileImage: req.body.profileImage,
            role: req.body.role
        })
        const userDuplicated = await User.findOne({userName: req.body.email})
            if(userduplicated){return res.status(400).json(`that email is already in use`)}

            const userSaved = await newUser.save()

            return res.status(201).json(userSaved)
    } catch (err) {
        return res.status(400).json(err)
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

        const updatedUser = await User.findByIdAndUpdate(id, newUser, {new:true})
        return res.status(200).json(updatedUser)
    } catch (err) {
        return res.status(400).json(`error at updateUserById: ${err}`)
    }
}

module.exports = { getUsers , userLogin, userSignUp, deleteUserById}