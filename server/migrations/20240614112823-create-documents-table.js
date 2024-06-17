'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('documents', [{
      id: 1,
      companySigDate: new Date('2022-12-23T11:19:27.017Z'),
      companySignatureName: 'test',
      documentName: 'test',
      documentStatus: 'test',
      documentType: 'test',
      employeeNumber: 'test',
      employeeSigDate: new Date('2022-12-23T11:19:27.017Z'),
      employeeSignatureName: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('documents', { id: 1 }, {});
  }
};
