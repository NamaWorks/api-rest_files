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

module.exports = { getUsers , userLogin, userSignUp}