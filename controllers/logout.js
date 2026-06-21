const router = require("express").Router()
const { where } = require("sequelize")
const { User, Session } = require("../models")
const { tokenExtractor } = require("../util/middleware")

router.delete("/", tokenExtractor, async (req, res, next) => {
  try {
    const deletedRows = await Session.destroy({where: {userId: req.decodedToken.id, token: req.token}})

    if (deletedRows === 0) {
      return res.status(404).json({error: "active session not found"})
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }

})


module.exports = router