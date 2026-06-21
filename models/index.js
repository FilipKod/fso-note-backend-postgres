const Blog = require("./blog")
const ReadingList = require("./readingList")
const Session = require("./sessions")
const User = require("./user")

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: ReadingList, as: "readings"})
Blog.belongsToMany(User, {through: ReadingList})

User.hasOne(Session)
Session.belongsTo(User)

module.exports = {
  Blog, User, ReadingList, Session
}