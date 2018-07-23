'use strict';
module.exports = (sequelize, DataTypes) => {
  var Symbol = sequelize.define('Symbol', {
    name: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {});
  Symbol.associate = function(models) {
    Symbol.hasOne(models.Party, {
      foreignKey: 'symbolId',
      as: 'party'
    })
  };
  Symbol.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    return {
      id: values.id,
      name: values.name,
      number: values.number,
      url: 'http://localhost:8000/symbols/' + values.id + ".png" 
    }
  }
  return Symbol;
};