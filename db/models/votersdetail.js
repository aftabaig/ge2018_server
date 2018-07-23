'use strict';
module.exports = (sequelize, DataTypes) => {
  var VotersDetail = sequelize.define('VotersDetail', {
    constituencyId: DataTypes.INTEGER,
    male: DataTypes.INTEGER,
    female: DataTypes.INTEGER
  }, {});
  VotersDetail.associate = function(models) {
    VotersDetail.belongsTo(models.Constituency, {
      foreignKey: 'constituencyId',
      as: 'constituency'
    }) 
  };
  return VotersDetail;
};