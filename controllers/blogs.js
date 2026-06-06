const router = require("express").Router();

const { nextTick } = require("node:process");
const { Blog } = require("../models")

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  if (blogs) {
    res.json(blogs)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create({...req.body})
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  const isDeleted = await blog.destroy()
  if (isDeleted) {
    res.status(204).end()
  } else {
    res.status(400).end()
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) return res.status(404).json({error: "Blog not found"})
    blog.set({...req.body})
    await blog.save()
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = router