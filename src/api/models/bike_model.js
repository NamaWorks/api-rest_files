const mongoose = require("mongoose")
const Maker = require("./maker_model")

const bikeSchema = new mongoose.Schema(
    {
        modelName: { type: String , required: true , unique: true  },
        // maker: { type: String , required: true ,  },
        maker: { type: mongoose.Types.ObjectId, ref: 'makers' },
        year: { type: Number , required: true , default: "TBD"  },
        image: { type: String , required: false },
        category: { type: String , required: false , default: "TBD" },
        accepted: { type: Boolean, default: false },

    }, {
        timestamps: true,
        collection: "bikes"
    }
)

const Bike = mongoose.model("bikes", bikeSchema, "bikes")

module.exports = Bike