'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Candidates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      constituencyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Constituencies',
          key: 'id'
        }
      },
      symbolId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Symbols',
          key: 'id'
        }
      },
      partyId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Parties',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Candidates');
  }
};