const mongoose = require("mongoose")
const Bike = require("../api/models/bike_model")
const Maker = require("../api/models/maker_model")

const bikes = [
    {
      modelName: "Honda CBR1000RR",
      maker: "Honda",
      year: 2004,
      image: "https://example.com/honda_cbr1000rr.jpg",
      category: "Superbike"
    },
    {
      modelName: "Kawasaki Ninja ZX-10R",
      maker: "Kawasaki",
      year: 2004,
      image: "https://example.com/kawasaki_ninja_zx10r.jpg",
      category: "Superbike"
    },
    {
      modelName: "Yamaha YZF-R6",
      maker: "Yamaha",
      year: 2004,
      image: "https://example.com/yamaha_yzf_r6.jpg",
      category: "Supersport"
    },
    {
      modelName: "Suzuki GSX-R750",
      maker: "Suzuki",
      year: 2005,
      image: "https://example.com/suzuki_gsxr750.jpg",
      category: "Superbike"
    },
    {
      modelName: "Ducati Panigale V4",
      maker: "Ducati",
      year: 2018,
      image: "https://example.com/ducati_panigale_v4.jpg",
      category: "Superbike"
    },
    {
      modelName: "BMW S1000RR",
      maker: "BMW",
      year: 2009,
      image: "https://example.com/bmw_s1000rr.jpg",
      category: "Superbike"
    },
    {
      modelName: "Triumph Street Triple",
      maker: "Triumph",
      year: 2007,
      image: "https://example.com/triumph_street_triple.jpg",
      category: "Streetfighter"
    },
    {
      modelName: "KTM 1290 Super Duke R",
      maker: "KTM",
      year: 2014,
      image: "https://example.com/ktm_1290_super_duke_r.jpg",
      category: "Streetfighter"
    },
    {
      modelName: "Aprilia RSV4",
      maker: "Aprilia",
      year: 2009,
      image: "https://example.com/aprilia_rsv4.jpg",
      category: "Superbike"
    },
    {
      modelName: "MV Agusta F3",
      maker: "MV Agusta",
      year: 2012,
      image: "https://example.com/mv_agusta_f3.jpg",
      category: "Supersport"
    },
    {
      modelName: "Harley-Davidson Sportster",
      maker: "Harley-Davidson",
      year: 1957,
      image: "https://example.com/harley_davidson_sportster.jpg",
      category: "Cruiser"
    },
    {
      modelName: "Indian Scout",
      maker: "Indian",
      year: 2014,
      image: "https://example.com/indian_scout.jpg",
      category: "Cruiser"
    },
    {
      modelName: "Kawasaki Z900",
      maker: "Kawasaki",
      year: 2017,
      image: "https://example.com/kawasaki_z900.jpg",
      category: "Naked"
    },
    {
      modelName: "Yamaha MT-07",
      maker: "Yamaha",
      year: 2014,
      image: "https://example.com/yamaha_mt07.jpg",
      category: "Naked"
    },
    {
      modelName: "Suzuki SV650",
      maker: "Suzuki",
      year: 1999,
      image: "https://example.com/suzuki_sv650.jpg",
      category: "Naked"
    },
    {
      modelName: "Honda CB500F",
      maker: "Honda",
      year: 2013,
      image: "https://example.com/honda_cb500f.jpg",
      category: "Naked"
    },
    {
      modelName: "Ducati Monster 821",
      maker: "Ducati",
      year: 2014,
      image: "https://example.com/ducati_monster_821.jpg",
      category: "Naked"
    },
    {
      modelName: "BMW R1250GS",
      maker: "BMW",
      year: 2019,
      image: "https://example.com/bmw_r1250gs.jpg",
      category: "Adventure"
    },
    {
      modelName: "KTM 790 Adventure",
      maker: "KTM",
      year: 2019,
      image: "https://example.com/ktm_790_adventure.jpg",
      category: "Adventure"
    }
  ]

  const bikesDocuments = bikes.map(bike => new Bike(bike))
  let bikesData = []

  const feedBikes = async () => {
    try {
        await mongoose
            .connect(process.env.DB_URL)
            .then(async () => {
                const allBikes = await Bike.find()
                if(allBikes.length){Bike.collection.drop()}
            })
            .catch(err => console.log(`error deleting data-bikes: ${err}`))
            .then(async () => {
                await Bike.insertMany(bikesDocuments)
                
                // //! Prepare populate function for the bikes makers
                
                // const makers = await Maker.find()
                // bikes.forEach(bike => {
                //   const bikeMaker = bike.maker
                //   makers.forEach(maker => {
                //     const {makerName} = maker
                //     if(makerName === bikeMaker) {
                //       // makerId = maker._id
                //       bike.maker = maker._id
                //     }
                //   })
                //   bikesData.push(new Bike(bike))
                // })
                // await Bike.insertMany(bikesData)

                console.log(`bikesDocuments inserted`)

            })
            .catch(err => console.log(`error at insertMany(bikesDocuments): ${err}`))
    } catch (err) {
        console.log(`error feeding bikes: ${err}`)
    }
  }

  module.exports = { feedBikes }