const { QueryInterface, DataTypes } = require('sequelize');

/** @param {{context: QueryInterface}} */
exports.up = async ({context: queryInterface}) => {
  await queryInterface.createTable("_sessions_", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: "users", key: "id"}
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })

  await queryInterface.addConstraint("_sessions_", {
    fields: ["user_id"],
    type: "unique",
    name: "_sessions__user_id_unique"
  })
};

/** @param {{context: QueryInterface}} */
exports.down = async ({context: queryInterface}) => {
  await queryInterface.dropTable("_sessions_")
};
