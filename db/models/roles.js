const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class Roles extends Sequelize.Model {}

Roles.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.DataTypes.STRING
    },
    status: {
        type: Sequelize.DataTypes.STRING
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'roles'
})

module.exports = Roles