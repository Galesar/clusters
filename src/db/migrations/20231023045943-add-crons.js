'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, { DataTypes }) {
    return queryInterface.createTable('Crons', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      startDate: DataTypes.DATE,
      processingTime: DataTypes.INTEGER,
      result: DataTypes.JSONB,
      name: DataTypes.STRING,
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('Crons');
  },
};
