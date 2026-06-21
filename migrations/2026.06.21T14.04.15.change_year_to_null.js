const { DataTypes, QueryInterface } = require("sequelize")

/** @param {{ context: QueryInterface }} */
exports.up = async ({ context: queryInterface }) => {
  await queryInterface.changeColumn("blogs", "year", {
    type: DataTypes.INTEGER,
    allowNull: true,
  })
};

/** @param {{ context: QueryInterface }} */
exports.down = async ({ context: queryInterface }) => {
  await queryInterface.changeColumn("blogs", "year", {
    type: DataTypes.INTEGER,
    allowNull: false,
  })
};
