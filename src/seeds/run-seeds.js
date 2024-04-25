const { feedBikes } = require("./bikes.seed");
const { feedMakers } = require("./makers.seed");
const { feedUsers } = require("./users.seed");

feedMakers()
feedBikes()
feedUsers()