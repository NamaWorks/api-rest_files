const mongoose = require("mongoose")
const Maker = require("../api/models/maker_model")

const makers = [
    {
        makerName: "Honda",
        country: "Japan",
        foundationYear: 1949,
        founder: "Sōichirō Honda",
        logo: "pending to add logo"
    },
    {
        makerName: "Triumph",
        country: "United Kingdom",
        foundationYear: 1902,
        founder: "John Bloor",
        logo: "pending to add logo"
    },
    {
        makerName: "Kawasaki",
        country: "Japan",
        foundationYear: 1896,
        founder: "Shozo Kawasaki",
        logo: "pending to add logo"
    },
    {
        makerName: "Yamaha",
        country: "Japan",
        foundationYear: 1887,
        founder: "Torakusu Yamaha",
        logo: "pending to add logo"
    },
    {
        makerName: "Suzuki",
        country: "Japan",
        foundationYear: 1909,
        founder: "Michio Suzuki",
        logo: "pending to add logo"
    },
    {
        makerName: "Ducati",
        country: "Italy",
        foundationYear: 1926,
        founder: "Antonio Cavalieri Ducati",
        logo: "pending to add logo"
    },
    {
        makerName: "BMW",
        country: "Germany",
        foundationYear: 1923,
        founder: "Karl Rapp",
        logo: "pending to add logo"
    },
    {
        makerName: "KTM",
        country: "Austria",
        foundationYear: 1934,
        founder: "Hans Trunkenpolz",
        logo: "pending to add logo"
    },
    {
        makerName: "Aprilia",
        country: "Italy",
        foundationYear: 1945,
        founder: "Alberto Beggio",
        logo: "pending to add logo"
    },
    {
        makerName: "MV Agusta",
        country: "Italy",
        foundationYear: 1945,
        founder: "Conde Giovanni Agusta",
        logo: "pending to add logo"
    },
    {
        makerName: "Harley-Davidson",
        country: "US",
        foundationYear: 1903,
        founder: "William S. Harley",
        logo: "pending to add logo"
    },
    {
        makerName: "Indian",
        country: "US",
        foundationYear: 1901,
        founder: "George M. Hendee",
        logo: "pending to add logo"
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
                    
                    await Maker.insertMany(makersDocuments);

                    //! OTHER WAY OF DOING IT, USING A FOREACH
                    // makersDocuments.forEach( async (maker)=> {
                    //     await maker.save()
                    // })

                    console.log(`makersDocuments insterted`)
                })
                .catch(err => console.log(`error at insertMany(makersDocuments): ${err}`))
    } catch (err) {
        console.log(`error feeding makers: ${err}`)
    }
}

module.exports = { feedMakers }