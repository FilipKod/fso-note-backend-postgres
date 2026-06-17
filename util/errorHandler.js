const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: "mallformated id"})
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).send({error: "invalid database operation or data format"})
  } else if (error.name === "SequelizeValidationError") {
    return response.status(400).send({error: error.message})
  } else if (error.name === "ReferenceError") {
    return response.status(404).json({error: error.message})
  }

  return next(error)
}

module.exports = { errorHandler }