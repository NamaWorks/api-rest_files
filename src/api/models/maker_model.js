const mongoose = require("mongoose")

const makerSchema = new mongoose.Schema(
    {
        makerName: { type: String, required: true, unique: true },
        country: { type: String, required: true },
        foundationYear: { type: Number, default: "TBD" },
        founder: { type: String, default: "TBD" },
        image: { type: String },
        accepted: { type: Boolean, default: false },
    }, {
        timestamps: true,
        collection: "makers"
    }
)

const Maker = mongoose.model("makers", makerSchema, "makers")

module.exports = Maker