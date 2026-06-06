require("dotenv").config({quiet: true})

module.exports = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT || 8080
}