const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log(`conection to DB sucessful`)
    } catch (err) {
        console.log(`error conecting to DB`)
    }
}

module.exports = { connectDB }