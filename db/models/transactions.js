const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class Transactions extends Sequelize.Model {}

Transactions.init({
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }

    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    transaction_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    total_items: {
        type: Sequelize.INTEGER,

    },
    total_amount: {
        type: Sequelize.INTEGER,

    },
    cash: {
        type: Sequelize.INTEGER,

    },
    changes: {
        type: Sequelize.INTEGER,

    },
    status: {
        type: Sequelize.STRING,
    },
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'transactions'
})

module.exports = Transactions