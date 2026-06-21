const { ReadingList, Blog, User } = require("../models");
const { tokenExtractor } = require("../util/middleware");

const router = require("express").Router()

router.post("/", async (req, res, next) => {
  console.log("body:", req.body)
  const {blogId, userId} = req.body;

  if (!blogId || !userId) {
    return res.status(400).json({error: "missing blogId and userId"})
  }

  try {
    const blog = await Blog.findByPk(blogId)
    const user = await User.findByPk(userId)
  
    if (!blog) return res.status(404).json({error: "blog not found"})
    if (!user) return res.status(404).json({error: "user not found"})

    const existing = await ReadingList.findOne({where: {blogId, userId}})
    if (existing) return res.status(400).json({error: "blog alredy added"})
  
    const readingList = await ReadingList.create({blogId, userId})
  
    res.json({
      id: readingList.id,
      read: readingList.read,
      blog_id: readingList.blogId,
      user_id: readingList.userId
    })
  } catch (error) {
    next(error)
  }
})

router.put("/:id", tokenExtractor, async (req, res, next) => {
  const {read} = req.body

  try {
    const bookmark = await ReadingList.findByPk(req.params.id)

    if (!bookmark) return res.status(404).json({error: "bookmark not found"})

    if (bookmark.userId !== req.decodedToken.id) {
      return res.status(401).json({error: "operation not allowed"})
    } else {
      bookmark.read = read
      await bookmark.save()

      res.json(bookmark)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router