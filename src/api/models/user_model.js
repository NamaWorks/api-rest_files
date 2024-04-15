const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

 const userSchema = new mongoose.Schema(
    {
        userName: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        image: {type: String, required:false , default:"TBD", trim: true},
        role: {type: String, enum:["user", "admin"], default:"user"},
        accepted: { type: Boolean, default: false },
    },
    {
     timestamps: true,
     collection: "users"   
    }
 )

 userSchema.pre("save", function() {
    this.password = bcrypt.hashSync(this.password, 10)
  })

 const User = mongoose.model("users", userSchema, "users")

 module.exports = User