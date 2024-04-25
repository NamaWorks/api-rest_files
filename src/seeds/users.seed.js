require("dotenv").config()
const mongoose = require("mongoose")
const User = require("../api/models/user_model")
const bcrypt = require("bcrypt")

const users = [
    {
        userName: "Admin",
        email: "admin@admin.com",
        password: "Admin123!@",
        image: "src/assets/user-img/admin.jpg",
        role: "admin",
        accepted: true
    },
    {
        userName: "Juan",
        email: "juan@email.com",
        password: "Juan123!@",
        image: "src/assets/user-img/juanjpg.jpg",
        role: "user",
        accepted: true
    },
    {
        userName: "Clara",
        email: "clara@email.com",
        password: "Clara123!@",
        image: "src/assets/user-img/clara.jpg",
        role: "user",
        accepted: true
    },
    {
        userName: "Rosa",
        email: "rosa@email.com",
        password: "Rosa123!@",
        image: "src/assets/user-img/rosa.jpg",
        role: "user",
        accepted: true
    },
    {
        userName: "Pepe",
        email: "pepe@email.com",
        password: "Pepe123!@",
        image: "src/assets/user-img/pepe.jpg",
        role: "user",
        accepted: true
    },
    {
        userName: "Alex",
        email: "alex@email.com",
        password: "Alex123!@",
        image: "src/assets/user-img/alex.jpg",
        role: "user",
        accepted: true
    },
]

const usersDocuments = users.map(user=>new User({
    userName: user.userName,
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    image: user.image,
    role: user.role,
    accepted: true
}))

const feedUsers = async () => {
    try {
        await mongoose
        .connect(process.env.DB_URL)
        .then( async () => {
            const allUsers = await User.find()
            if(allUsers.length){User.collection.drop()}
        })
        .catch(err => console.log(` error deleting data-User: ${err}`))
        .then(async () => {
            await User.insertMany(usersDocuments)
            console.log(`usersDocuments inserted`)
        })
        .catch(err => console.log(`error inserting usersDocuments: ${err}`))
    } catch (err) {
        console.log(`error feeding users: ${err}`)
    }
}

module.exports = { feedUsers }