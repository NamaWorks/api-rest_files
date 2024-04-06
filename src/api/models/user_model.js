const mongoose = require("mongoose")

 const userSchema = new mongoose.Schema(
    {
        userName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        profileImage: {type: String, required:false , default:"TBD"},
        role: {type: String, enum:["user", "admin"], default:"user"}
    },
    {
     timestamps: true,
     collection: "users"   
    }
 )