const mongoose = require("mongoose")
const Maker = require("../api/models/maker_model")

const makers = [
    {
        makerName: "Honda",
        country: "Japan",
        foundationYear: 1949,
        founder: "Sōichirō Honda",
        image: "src/assets/makers_img/honda.jpg",
    },
    {
        makerName: "Triumph",
        country: "United Kingdom",
        foundationYear: 1902,
        founder: "John Bloor",
        image: "src/assets/makers_img/triumph.jpg",
    },
    {
        makerName: "Kawasaki",
        country: "Japan",
        foundationYear: 1896,
        founder: "Shozo Kawasaki",
        image: "src/assets/makers_img/kawasaki.jpg",
    },
    {
        makerName: "Yamaha",
        country: "Japan",
        foundationYear: 1887,
        founder: "Torakusu Yamaha",
        image: "src/assets/makers_img/yamaha.jpg",
    },
    {
        makerName: "Suzuki",
        country: "Japan",
        foundationYear: 1909,
        founder: "Michio Suzuki",
        image: "src/assets/makers_img/suzuki.jpg",
    },
    {
        makerName: "Ducati",
        country: "Italy",
        foundationYear: 1926,
        founder: "Antonio Cavalieri Ducati",
        image: "src/assets/makers_img/ducati.jpg",
    },
    {
        makerName: "BMW",
        country: "Germany",
        foundationYear: 1923,
        founder: "Karl Rapp",
        image: "src/assets/makers_img/bmw.jpg",
    },
    {
        makerName: "KTM",
        country: "Austria",
        foundationYear: 1934,
        founder: "Hans Trunkenpolz",
        image: "src/assets/makers_img/ktm.png",
    },
    {
        makerName: "Aprilia",
        country: "Italy",
        foundationYear: 1945,
        founder: "Alberto Beggio",
        image: "src/assets/makers_img/aprilia.png",
    },
    {
        makerName: "MV Agusta",
        country: "Italy",
        foundationYear: 1945,
        founder: "Conde Giovanni Agusta",
        image: "src/assets/makers_img/mv-agusta.jpeg",
    },
    {
        makerName: "Harley-Davidson",
        country: "US",
        foundationYear: 1903,
        founder: "William S. Harley",
        image: "src/assets/makers_img/Harley_davidson.jpg",
    },
    {
        makerName: "Indian",
        country: "US",
        foundationYear: 1901,
        founder: "George M. Hendee",
        image: "src/assets/makers_img/indian.png",
    }
]

const makersDocuments = makers.map(maker => new Maker({
    ...maker,
    accepted: true
}))

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