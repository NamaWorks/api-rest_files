const mongoose = require("mongoose")

const makerSchema = new mongoose.Schema(
    {
        makerName: { type: String, require: true },
        country: { type: String, require: true },
        foundationYear: { type: Number, default: "TBD" },
        founder: { type: String, default: "TBD" }
    }, {
        timestamps: true
    }
)