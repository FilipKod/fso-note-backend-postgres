const { ReadingList, Blog, User } = require("../models")

const router = require("express").Router()

router.post("/", async (req, res, next) => {
  const {blogId, userId} = req.body;

  try {
    const blog = await Blog.findByPk(blogId)
    const user = await User.findByPk(userId)
  
    if (!blog) return res.status(404).json({error: "blog not found"})
    if (!user) return res.status(404).json({error: "user not found"})
  
    const readingList = await ReadingList.create({blogId, userId})
  
    res.json(readingList)
  } catch (error) {
    next(error)
  }

})

module.exports = router