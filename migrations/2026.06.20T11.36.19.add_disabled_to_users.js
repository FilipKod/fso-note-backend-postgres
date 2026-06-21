const { QueryInterface, DataTypes } = require('sequelize');

/** @param {{context: QueryInterface}} */
exports.up = async ({context: queryInterface}) => {
  await queryInterface.addColumn("users", "disabled", {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
};

/** @param {{context: QueryInterface}} */
exports.down = async ({context: queryInterface}) => {
  await queryInterface.removeColumn("users", "disabled")
};
