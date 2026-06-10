const { Blog } = require("../models")
const { sequelize } = require("../util/db")

const router = require("express").Router()

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"]
    ],
    group: "author",
    order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]]
  })

  res.json(blogs)
})

module.exports = router