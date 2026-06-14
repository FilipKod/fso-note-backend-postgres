const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const router = require("express").Router()
const { User } = require("../models")
const { JWT_SERCET } = require("../util/config")

router.post("/", async (req, res) => {
  const body = req.body

  const user = await User.scope("withPassword").findOne({
    where: {
      username: body.username
    }
  })
  
  const passwordCorrect = user && await bcrypt.compare(body.password, user.hashedPassword)
  
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password"
    })
  }

  const userForToken = {
    username: user.name,
    id: user.id
  }

  const token = jwt.sign(userForToken, JWT_SERCET)

  res
    .status(200)
    .json({token, username: user.username, name: user.name})
})


module.exports = router