'use strict'

// LOCATION MODEL NEEDS TO CHANGE. MAPBOX DOES NOT PROVIDE THESE FIELDS.

module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    CountryId: DataTypes.INTEGER,
    verified: DataTypes.BOOLEAN,
    placeId: DataTypes.STRING,
    name: DataTypes.STRING,
    telephone: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    utcOffset: DataTypes.INTEGER,
    openingHours: DataTypes.JSON,
    openingHoursText: DataTypes.JSON,
    imageUrl: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  Location.associate = function (models) {
    Location.belongsTo(models.Country)
    Location.hasMany(models.Post)
  }

  return Location
}
