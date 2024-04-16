const mongoose = require("mongoose")
const Bike = require("../api/models/bike_model")
const Maker = require("../api/models/maker_model")
const { upload } = require("../middlewares/files.middlewares")
const cloudinary = require('cloudinary').v2;

const bikes = [
    {
      modelName: "Honda CBR1000RR",
      maker: "Honda",
      year: 2004,
      image: "src/assets/bikes-img/Honda-CBR-1000RR-2004.jpg",
      category: "Superbike",
      accepted: true
    },
    {
      modelName: "Kawasaki Ninja ZX-10R",
      maker: "Kawasaki",
      year: 2004,
      image: "src/assets/bikes-img/kawasaki-zx10r-2004.jpg",
      category: "Superbike",
      accepted: true
    },
    {
      modelName: "Yamaha YZF-R6",
      maker: "Yamaha",
      year: 2004,
      image: "src/assets/bikes-img/2004_red_02_yamaha_yzfr6.jpg",
      category: "Supersport",
      accepted: true
    },
    {
      modelName: "Suzuki GSX-R750",
      maker: "Suzuki",
      year: 2005,
      image: "src/assets/bikes-img/2004_blue_01_suzuki_gsxr750.jpg",
      category: "Superbike",
      accepted: true
    },
    {
      modelName: "Ducati Panigale V4",
      maker: "Ducati",
      year: 2018,
      image: "src/assets/bikes-img/16-02-PANIGALE-V4-S.jpg",
      category: "Superbike",
      accepted: true
    },
    {
      modelName: "BMW S1000RR",
      maker: "BMW",
      year: 2009,
      image: "src/assets/bikes-img/bmw-s1000rr-2009-2012.jpg",
      category: "Superbike",
      accepted: true
    },
    {
      modelName: "KTM 1290 Super Duke R",
      maker: "KTM",
      year: 2014,
      image: "src/assets/bikes-img/ktm-1290.jpg",
      category: "Streetfighter",
      accepted: true
    },
    {
      modelName: "Aprilia RSV4",
      maker: "Aprilia",
      year: 2009,
      image: "src/assets/bikes-img/3156_Aprilia RSV 4 09 Slip-on PK 1.jpg",
      category: "Superbike",
      accepted: true
    },
    {
      modelName: "MV Agusta F3",
      maker: "MV Agusta",
      year: 2012,
      image: "src/assets/bikes-img/mv-agusta-f3-rc.jpg",
      category: "Supersport",
      accepted: true
    },
    {
      modelName: "Harley-Davidson Sportster",
      maker: "Harley-Davidson",
      year: 1957,
      image: "src/assets/bikes-img/hd-sporster.jpg",
      category: "Cruiser",
      accepted: true
    },
    {
      modelName: "Indian Scout",
      maker: "Indian",
      year: 2014,
      image: "src/assets/bikes-img/INDIAN-Scout-9999_3.jpg",
      category: "Cruiser",
      accepted: true
    },
    {
      modelName: "Kawasaki Z900",
      maker: "Kawasaki",
      year: 2017,
      image: "src/assets/bikes-img/z900.jpg",
      category: "Naked",
      accepted: true
    },
    {
      modelName: "Yamaha MT-07",
      maker: "Yamaha",
      year: 2014,
      image: "src/assets/bikes-img/Yamaha-MT-7-2.jpg",
      category: "Naked",
      accepted: true
    },
    {
      modelName: "Suzuki SV650",
      maker: "Suzuki",
      year: 1999,
      image: "src/assets/bikes-img/Suzuki-SV650S-1-1200x675.jpg",
      category: "Naked",
      accepted: true
    },
    {
      modelName: "Honda CB500F",
      maker: "Honda",
      year: 2013,
      image: "src/assets/bikes-img/25693-honda-cb500f-2013 (1).jpg",
      category: "Naked",
      accepted: true
    },
    {
      modelName: "Ducati Monster 821",
      maker: "Ducati",
      year: 2014,
      image: "src/assets/bikes-img/monster_821_2014_r_stickers-550x550.jpg",
      category: "Naked",
      accepted: true
    },
    {
      modelName: "BMW R1250GS",
      maker: "BMW",
      year: 2019,
      image: "src/assets/bikes-img/bmw-r-1250-gs-adventure-2019.jpg",
      category: "Adventure",
      accepted: true
    },
    {
      modelName: "KTM 790 Adventure",
      maker: "KTM",
      year: 2019,
      image: "src/assets/bikes-img/ktm-790-adv.jpg",
      category: "Adventure",
      accepted: true
    }
  ]

  const bikesDocuments = bikes.map(bike => new Bike({
    ...bike,
    accepted: true
  }))
  
  let bikesData = []
  const prepareBikesData = async () => {
    try {    
        //! Prepare populate function for the bikes makers
        const makers = await Maker.find()
        bikes.forEach(bike => {
          let bikeMaker = bike.maker
          makers.forEach(async (maker) => {
            const {makerName} = maker
            if(makerName === bikeMaker) {
              bike.maker = maker._id
            }
          })

          //! Upload to cloudinary
          // cloudinary.uploader
          // .upload(bike.image, { 
          //   use_filename: true,
          //   folder: "12_RTC_P12_API-REST-FILES"})
          // .then((result)=>{
          //   console.log(result.url)
          //   bike.image = result.url
          //   // console.log(bike)
          // });
          
          bikesData.push(new Bike(bike))
        })
    } catch (err) {
      console.log(`error preparing bikes data: ${err}`)
    }
  }

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
                await prepareBikesData()
                console.log(`bikeData prepared`)
            })
            .catch(err => console.log(`error at prepareBikesData: ${err}`))
            .then(async () => {
              await Bike.insertMany(bikesData)
              console.log(`bikesData inserted`)
            })
            .catch(err => console.log(`error at insertMany(bikesDocuments): ${err}`))
    } catch (err) {
        console.log(`error feeding bikes: ${err}`)
    }
  }

  module.exports = { feedBikes }