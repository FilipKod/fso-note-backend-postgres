const router = require("express").Router()
const { User } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post("/", async (req, res) => {
  try {
    const user = await User.create({...req.body})
    res.json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:username", async (req, res) => {
  try {
    const user = await User.findOne({where: {username: req.params.username}})

    if (!user) return res.status(404).json({error: "user not found"})

    user.set({
      username: req.body.username
    })

    const updatedUser = await user.save()
    res.json(updatedUser)
  } catch (error) {
    res.status(401).json(error)
  }
})

module.exports = router