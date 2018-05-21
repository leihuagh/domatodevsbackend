'use strict'
module.exports = function (sequelize, DataTypes) {
  // var Location = sequelize.define('Location', {
  //   CountryId: DataTypes.INTEGER,
  //   verified: DataTypes.BOOLEAN,
  //   placeId: DataTypes.STRING,
  //   name: DataTypes.STRING,
  //   telephone: DataTypes.STRING,
  //   address: DataTypes.STRING,
  //   latitude: DataTypes.FLOAT,
  //   longitude: DataTypes.FLOAT,
  //   utcOffset: DataTypes.INTEGER,
  //   openingHours: DataTypes.JSON,
  //   openingHoursText: DataTypes.JSON,
  //   imageUrl: DataTypes.STRING,
  //   createdAt: DataTypes.DATE,
  //   updatedAt: DataTypes.DATE
  // })

  // TEMPORARILY UNTIL WE HV OUR OWN DB. SEMI-GUARANTEED FIELDS FROM GEOCODER
  var Location = sequelize.define('Location', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    verified: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  Location.associate = function (models) {
    // Location.belongsTo(models.Country)
    Location.hasMany(models.Event)
    Location.hasMany(models.Post)
  }

  return Location
}
