'use strict';
module.exports = (sequelize, DataTypes) => {
  var PartyDetail = sequelize.define('PartyDetail', {
    partyId: DataTypes.INTEGER,
    leader: DataTypes.STRING,
    flag: DataTypes.STRING
  }, {});
  PartyDetail.associate = function(models) {
    // associations can be defined here
  };
  return PartyDetail;
};