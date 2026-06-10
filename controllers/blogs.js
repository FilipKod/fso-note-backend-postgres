const jwt = require("jsonwebtoken")
const router = require("express").Router();

const { Blog, User } = require("../models");
const { JWT_SERCET } = require("../util/config");
const { Op } = require("sequelize");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), JWT_SERCET)
    } catch {
      return res.status(401).json({error: "token invalid"})
    }
  } else {
    return res.status(401).json({error: "token missing"})
  }
  next()
}

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: {
      exclude: ["userId"]
    },
    include: {
      model: User,
      attributes: ["name", "username"]
    },
    where,
    order: [
      ["likes", "DESC"]
    ]
  })

  if (blogs) {
    res.json(blogs)
  } else {
    res.status(404).end()
  }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) return res.status(404).send({error: "blog not found"})

  if (blog.userId !== user.id) return res.status(401).send({error: "user is not allowed for operation"})

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