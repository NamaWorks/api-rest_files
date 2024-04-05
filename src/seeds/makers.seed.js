const mongoose = require("mongoose")
const Maker = require("../api/models/maker_model")

const makers = [
    {
        makerName: "Honda",
        country: "Japan",
        foundationYear: 1949,
        founder: "Sōichirō Honda",
    },
    {
        makerName: "Kawasaki",
        country: "Japan",
        foundationYear: 1896,
        founder: "Shozo Kawasaki",
    },
    {
        makerName: "Yamaha",
        country: "Japan",
        foundationYear: 1887,
        founder: "Torakusu Yamaha",
    },
    {
        makerName: "Suzuki",
        country: "Japan",
        foundationYear: 1909,
        founder: "Michio Suzuki",
    },
    {
        makerName: "Ducati",
        country: "Italy",
        foundationYear: 1926,
        founder: "Antonio Cavalieri Ducati",
    },
    {
        makerName: "BMW",
        country: "Germany",
        foundationYear: 1923,
        founder: "Karl Rapp",
    },
    {
        makerName: "KTM",
        country: "Austria",
        foundationYear: 1934,
        founder: "Hans Trunkenpolz",
    },
    {
        makerName: "Aprilia",
        country: "Italy",
        foundationYear: 1945,
        founder: "Alberto Beggio",
    },
    {
        makerName: "MV Agusta",
        country: "Italy",
        foundationYear: 1945,
        founder: "Conde Giovanni Agusta",
    },
    {
        makerName: "Harley-Davidson",
        country: "US",
        foundationYear: 1903,
        founder: "William S. Harley",
    },
    {
        makerName: "Indian",
        country: "US",
        foundationYear: 1901,
        founder: "George M. Hendee",
    }
]

const makersDocuments = makers.map(maker => new Maker(maker))

const feedMakers = async () => {
    try {
        await mongoose
            .connect(process.env.DB_URL)
                .then( async () => {
                    const allMakers = await Maker.find()
                    allMakers.length ? await Maker.collection.drop() : console.log(`the makers collection is already empty`)
                })
                .catch(err => console.log(`error deleting data-makers: ${err}`))
                .then(async () => {
                    
                    // await Maker.instertMany(makersDocuments); // WE HAVE TO CHECK WHY THIS IS NOT WORKING

                    makersDocuments.forEach( async (maker)=> {
                        await maker.save()
                    })

                    console.log(`makersDocuments insterted`)
                })
                .catch(err => console.log(`error at insertMany(makersDocuments): ${err}`))
    } catch (err) {
        console.log(`error feeding makers: ${err}`)
    }
}

module.exports = { feedMakers }