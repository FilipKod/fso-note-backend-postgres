const { DataTypes, QueryInterface } = require("sequelize")

/** @param {{ context: QueryInterface }} */
exports.up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("blogs", "year", {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2026
  })
};

/** @param {{ context: QueryInterface }} */
exports.down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("blogs", "year")
};
