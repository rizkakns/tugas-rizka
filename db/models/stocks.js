const { Sequelize, DataTypes } = require("sequelize")
const connection = require("./sequelize")

class Stocks extends Sequelize.Model {}

Stocks.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    items_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "items",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    available_stock: {
      type: Sequelize.INTEGER,
    },
    total_stock: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: "stocks",
  }
)

module.exports = Stocks
