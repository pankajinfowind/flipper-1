var environment = process.env.NODE_ENV || "development";
var config = require('../knexfile')[environment];
module.exports = config;