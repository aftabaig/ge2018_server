'use strict';
module.exports = (sequelize, DataTypes) => {
  var Candidate = sequelize.define('Candidate', {
    fullName: DataTypes.STRING,
    score: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  Candidate.associate = function(models) {
    Candidate.belongsTo(models.Symbol, {
      foreignKey: 'symbolId',
      as: 'symbol'
    })
    Candidate.belongsTo(models.Party, {
      foreignKey: 'partyId',
      as: 'party'
    });
    Candidate.belongsTo(models.Constituency, {
      foreignKey: 'constituencyId',
      as: 'constituency'
    });
  };
  return Candidate;
};