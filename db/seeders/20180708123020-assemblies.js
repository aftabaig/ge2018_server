'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Assemblies', [
      { name: 'National Assembly', abbreviation: 'NA', createdAt: Sequelize.literal('NOW()'), updatedAt: Sequelize.literal('NOW()') },
      { name: 'Punjab Assembly', abbreviation: 'PP', createdAt: Sequelize.literal('NOW()'), updatedAt: Sequelize.literal('NOW()')}, 
      { name: 'Sindh Assembly', abbreviation: 'PS', createdAt: Sequelize.literal('NOW()'), updatedAt: Sequelize.literal('NOW()') },
      { name: 'Khyber Pakhtunkhwa Assembly', abbreviation: 'PK', createdAt: Sequelize.literal('NOW()'), updatedAt: Sequelize.literal('NOW()') },
      { name: 'Balochistan Assembly', abbreviation: 'PB', createdAt: Sequelize.literal('NOW()'), updatedAt: Sequelize.literal('NOW()') } 
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Assemblies', {
      abbreviation: [
        'NA',
        'PP',
        'PS',
        'PK',
        'PB'
      ]
    });
  }
};
