'use strict'
module.exports = function (sequelize, DataTypes) {
  var Country = sequelize.define('Country', {
    name: DataTypes.STRING,
    code: DataTypes.STRING
  })

  Country.associate = function (models) {
    // Country.hasMany(models.User) no backwards reference in schema
    // Country.hasMany(models.Location)
    Country.belongsToMany(models.Itinerary, {through: 'CountriesItineraries'})
  }

  return Country
}
