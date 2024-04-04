const mongoose = require("mongoose")

const bikeSchema = new mongoose.Schema(
    {
        modelName: { type: String , required: true ,  },
        maker: { type: String , required: true ,  },
        year: { type: Number , required: true , default: "TBD"  },
        image: { type: String , required: true ,  },
        category: { type: String , required: false , default: "TBD" },

    }, {
        timestamps: true,
        collection: "bikes"
    }
)

const Bike = mongoose.model("bikes", bikeSchema, "bikes")

module.exports = Bike