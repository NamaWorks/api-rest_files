const mongoose = require("mongoose")
const User = require("../api/models/user_model")

const users = []

const usersDocuments = users.map(user=>new User(user))

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