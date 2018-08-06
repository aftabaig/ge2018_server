'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Candidates', 'status', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Candidates', 'status');
  }
};
