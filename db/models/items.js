const { Sequelize, DataTypes } = require("sequelize")
const connection = require("./sequelize")

class Items extends Sequelize.Model {}

Items.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_item: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    total_stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    expired_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    weight: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: "items",
  }
)

module.exports = Items
