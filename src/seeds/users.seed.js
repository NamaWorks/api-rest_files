const mongoose = require("mongoose")
const User = require("../api/models/user_model")
const bcrypt = require("bcrypt")

const users = [
    {
        userName: "Admin",
        email: "admin@admin.com",
        password: "Admin123!@",
        profileImage: "#",
        role: "admin",
    },
    {
        userName: "Juan",
        email: "juan@email.com",
        password: "Juan123!@",
        profileImage: "#",
        role: "user",
    },
    {
        userName: "Clara",
        email: "clara@email.com",
        password: "Clara123!@",
        profileImage: "#",
        role: "user",
    },
    {
        userName: "Rosa",
        email: "rosa@email.com",
        password: "Rosa123!@",
        profileImage: "#",
        role: "user",
    },
    {
        userName: "Pepe",
        email: "pepe@email.com",
        password: "Pepe123!@",
        profileImage: "#",
        role: "user",
    },
    {
        userName: "Alex",
        email: "alex@email.com",
        password: "Alex123!@",
        profileImage: "#",
        role: "user",
    },
]

const usersDocuments = users.map(user=>new User({
    userName: user.userName,
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    profileImage: user.profileImage,
    role: user.role
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