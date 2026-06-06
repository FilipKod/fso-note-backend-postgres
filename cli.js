require("dotenv").config({quiet: true})
const { Sequelize, QueryTypes } = require("sequelize")

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  ssl: false
})

const main = async () => {
  try {
    await sequelize.authenticate({logging: false})
    const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT})
    blogs.map(blog => {
      console.log(`${blog.author || "anonym"}: '${blog.title}', ${blog.likes} likes`)
    })
    sequelize.close()
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main()