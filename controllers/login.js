const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const router = require("express").Router()
const { User, Session } = require("../models")
const { JWT_SERCET } = require("../util/config")

router.post("/", async (req, res, next) => {
  try {
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
    
    await Session.destroy({where: {userId: user.id}})

    if (user.disabled) return res.status(401).json({error: "user disabled, contact admin"})
  
    await Session.create({
      userId: user.id,
      token
    })

    res
      .status(200)
      .json({token, username: user.username, name: user.name})
  } catch (error) {
    next(error)
  }

})


module.exports = router