const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "username must be a valid email address"
      }
    }
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user',
  defaultScope: {
    attributes: {
      exclude: ["hashed_password", "hashedPassword"]
    }
  },
  scopes: {
    withPassword: {
      attributes: { include: ["hashedPassword"] }
    }
  }
})

module.exports = User