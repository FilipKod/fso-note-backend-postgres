const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: "mallformated id"})
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).send({error: "invalid database operation or data format"})
  }

  return next(error)
}

module.exports = { errorHandler }