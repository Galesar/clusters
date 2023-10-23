'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, { DataTypes }) {
    return queryInterface.createTable('Users', {
      id: DataTypes.INTEGER,
      balance: DataTypes.FLOAT,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 0,
        },
      },
      password: DataTypes.STRING,
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('Users');
  },
};
