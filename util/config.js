require("dotenv").config({quiet: true})

module.exports = {
  DB_URL: process.env.DATABASE_URL,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  PORT: process.env.PORT || 3001,
  JWT_SERCET: process.env.SECRET,
  TESTING: process.env.TESTING
}