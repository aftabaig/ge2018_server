'use strict';
module.exports = (sequelize, DataTypes) => {
  var Assembly = sequelize.define('Assembly', {
    name: DataTypes.STRING,
    abbreviation: DataTypes.STRING
  }, {});
  Assembly.associate = function(models) {
  };
  return Assembly;
};