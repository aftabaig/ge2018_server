'use strict';
module.exports = (sequelize, DataTypes) => {
  var Party = sequelize.define('Party', {
    name: DataTypes.STRING,
    abbreviation: DataTypes.STRING,
    symbolId: DataTypes.INTEGER
  }, {});
  Party.associate = function(models) {
    Party.belongsTo(models.Symbol, {
      foreignKey: 'symbolId',
      as: 'symbol'
    });
    Party.hasMany(models.Candidate, {
      foreignKey: 'partyId',
      as: 'candidates'
    })
  };
  return Party;
};