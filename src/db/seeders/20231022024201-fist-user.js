'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'test@gmail.com',
        balance: 1000,
        password: 'password',
        id: 1,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', { id: 1 }, {});
  },
};
