const { configCloudinary } = require("../middlewares/files.middlewares");
const { feedBikes } = require("./bikes.seed");
const { feedMakers } = require("./makers.seed");
const { feedUsers } = require("./users.seed");
const cloudinary = require("cloudinary").v2

configCloudinary()

const runFeeds = async () => {
  cloudinary.api.delete_resources_by_prefix("12_RTC_P12_API-REST-FILES", function(result){});
  await feedUsers()
  await feedMakers()
  await feedBikes()

  process.exit()
}

runFeeds()