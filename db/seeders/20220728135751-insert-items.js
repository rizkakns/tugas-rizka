'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('items', [
      {
        id: 1,
        name_item: 'Pulpen',
        price: 1500,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name_item: 'Buku',
        price: 2000,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name_item: 'Penggaris',
        price: 1500,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name_item: 'Penghapus',
        price: 1500,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        name_item: 'Kertas Kado',
        price: 2000,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        name_item: 'Stepler',
        price: 50000,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        name_item: 'Sampul Buku',
        price: 20000,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        name_item: 'Pensil',
        price: 3000,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 9,
        name_item: 'Kotak Pensil',
        price: 20000,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 10,
        name_item: 'Amplop',
        price: 500,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 11,
        name_item: 'Clip',
        price: 2000,
        total_stock: 100,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('items', null, {});
  }
};
