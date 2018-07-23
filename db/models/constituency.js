'use strict';
module.exports = (sequelize, DataTypes) => {
  var Constituency = sequelize.define('Constituency', {
    name: DataTypes.STRING,
    area: DataTypes.STRING,
    assemblyId: DataTypes.INTEGER
  }, {});
  Constituency.associate = function(models) {
    Constituency.belongsTo(models.Assembly, {
      foreignKey: 'assemblyId',
      as: 'assembly'
    });
    Constituency.hasMany(models.Candidate, {
      foreignKey: 'constituencyId',
      as: 'candidates'
    });
    Constituency.hasOne(models.VotersDetail, {
      foreignKey: 'constituencyId',
      as: 'votersDetail'
    })
  };
  return Constituency;
};