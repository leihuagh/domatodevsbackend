'use strict'
module.exports = function (sequelize, DataTypes) {
  // SEMI-GUARANTEED FIELDS FROM GEOCODER
  var Location = sequelize.define('Location', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    CountryId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Countries'
        },
        key: 'id'
      }
    },
    verified: {
      type: DataTypes.BOOLEAN
    },
    name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    longitude: {
      type: DataTypes.FLOAT
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })

  Location.associate = function (models) {
    Location.belongsTo(models.Country)
    Location.hasMany(models.Event)
    Location.hasMany(models.Post)
    Location.hasMany(models.Bucket)
  }

  return Location
}
