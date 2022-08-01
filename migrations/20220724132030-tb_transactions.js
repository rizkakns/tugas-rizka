'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'transactions', {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
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
                created_at: {
                    type: Sequelize.DATE,
                    default: new Date()
                },
                updated_at: {
                    type: Sequelize.DATE,
                    default: new Date()
                },
                deleted_at: {
                    type: Sequelize.DATE
                },
            },
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('transactions');
    }
};