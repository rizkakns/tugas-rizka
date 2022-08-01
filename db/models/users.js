const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class Users extends Sequelize.Model {}

Users.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.DataTypes.STRING
    },
    address: {
        type: Sequelize.DataTypes.TEXT
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
    phone: {
        type: Sequelize.DataTypes.STRING
    },
    email: {
        type: Sequelize.DataTypes.STRING
    },
    status: {
        type: Sequelize.DataTypes.STRING
    },
    role_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: 'roles',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'users'
})

module.exports = Users