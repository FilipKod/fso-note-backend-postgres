const jwt = require("jsonwebtoken")

const { JWT_SERCET } = require("../util/config");
const { Session, User } = require("../models");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const tokenString = authorization.substring(7)

      const session = await Session.findOne({where: {token: tokenString}})
      if (!session) {
        return res.status(401).json({error: "session invalid or expired"})
      }

      const decodedToken = jwt.verify(tokenString, JWT_SERCET)
      
      const user = await User.findByPk(decodedToken.id)
      
      if (!user || user.disabled) {
        await Session.destroy({where: {token: tokenString}})
        return res.status(401).json({error: "user account is disabled"})
      }

      req.token = tokenString
      req.decodedToken = decodedToken
      req.user = user
    } catch {
      return res.status(401).json({error: "token invalid"})
    }
  } else {
    return res.status(401).json({error: "token missing"})
  }
  next()
}

module.exports = { 
  tokenExtractor
 }