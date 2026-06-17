const { Sequelize } = require("sequelize")
const { DB_URL, TEST_DATABASE_URL, NODE_ENV } = require("./config")
const { Umzug, SequelizeStorage } = require("umzug")
const path = require("path")

const urlToDb = NODE_ENV === "test" ? TEST_DATABASE_URL : DB_URL
console.log(urlToDb)

const sequelize = new Sequelize(urlToDb, {
  dialect: 'postgres',
  ssl: false
})

const umzug = new Umzug({
  migrations: { 
    glob: "migrations/*.js",
   },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  logger: console,
  create: {
    folder: path.join(__dirname, "..", "migrations")
  }
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    if (NODE_ENV === "production" || NODE_ENV === "test") {
      await runMigrations()
    }
    console.log("connected to database")
  } catch (error) {
    console.log("failed to connect to the database", error)
    return process.exit(1)
  }

  return null
}

const runMigrations = async () => {
  const migrations = await umzug.up()
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name)
  })
}

module.exports = { connectToDatabase, sequelize, umzug }