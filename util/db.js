const { Sequelize } = require("sequelize")

const { DB_URL, TESTING, TEST_DATABASE_URL } = require("./config")

const urlToDb = TESTING ? TEST_DATABASE_URL : DB_URL
console.log(urlToDb)
const sequelize = new Sequelize(urlToDb, {
  dialect: 'postgres',
  ssl: false
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("connected to database")
  } catch (error) {
    console.log("failed to connect to the database")
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }