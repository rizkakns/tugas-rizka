const Roles = require('./roles');
const Users = require('./users');
const sequelize = require('./sequelize');
const Items = require('./items');
const Stocks = require('./stocks');
const Transactions = require('./transactions')
const TransactionItems = require('./transaction_items')

Roles.hasMany(Users, {
    as: 'users',
    foreignKey: 'role_id'
});

Users.belongsTo(Roles, {
    as: 'role',
    foreignKey: 'role_id'
});

Items.hasOne(Stocks, {
    as: 'stock',
    foreignKey: 'items_id'
});

Stocks.belongsTo(Items, {
    as: 'item',
    foreignKey: 'items_id'
});

Transactions.belongsTo(Users, {
    as: 'users',
    foreignKey: 'user_id',
})

TransactionItems.hasMany(Items, {
    as: 'items',
    foreignKey: 'item_id',
})

TransactionItems.hasMany(Transactions, {
    as: 'transactions',
    foreignKey: 'transaction_id',
})

module.exports = {
    sequelize,
    Users,
    Roles,
    Transactions,
    TransactionItems,
    Items,
    Stocks
};