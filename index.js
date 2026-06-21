const express = require("express")
const app = express()

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")
const { errorHandler } = require("./util/errorHandler")

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const logoutRouter = require("./controllers/logout")
const authorsRouter = require("./controllers/authors")
const resetRouter = require("./controllers/reset")
const readingListRouter = require("./controllers/readingLists")

app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/logout", logoutRouter)
app.use("/api/authors", authorsRouter)
app.use("/api/reset", resetRouter)
app.use("/api/readinglists", readingListRouter)

app.get("/", (req, res) => {
  res.status(200).end()
})

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  }) 
}

start()