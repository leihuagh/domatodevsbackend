'use strict'
module.exports = function (sequelize, DataTypes) {
  var Country = sequelize.define('Country', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })

  Country.associate = function (models) {
    // Country.hasMany(models.User) no backwards reference in schema
    Country.hasMany(models.Location)
    Country.belongsToMany(models.Itinerary, {through: 'CountriesItineraries'})
  }

  return Country
}
