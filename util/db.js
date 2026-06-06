const { Sequelize } = require("sequelize")

const { DB_URL } = require("./config")

const sequelize = new Sequelize(DB_URL, {
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