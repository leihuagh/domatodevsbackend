'use strict'
module.exports = function (sequelize, DataTypes) {
  var CountriesItineraries = sequelize.define('CountriesItineraries', {
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
    ItineraryId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Itineraries'
        },
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })
  return CountriesItineraries
}
