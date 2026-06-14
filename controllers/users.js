const router = require("express").Router()
const bcrypt = require("bcryptjs")
const { User, Blog } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ["userId"]
      }
    }
  })
  res.json(users)
})

router.post("/", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = await User.create({...req.body, hashedPassword})
    const { hashedPassword: _, ...userWithoutPassword } = user.toJSON()
    res.json(userWithoutPassword)
  } catch (error) {
    next(error)
  }
})

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({where: {username: req.params.username}})

    if (!user) return res.status(404).json({error: "user not found"})

    user.set({
      username: req.body.username
    })

    const updatedUser = await user.save()
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router