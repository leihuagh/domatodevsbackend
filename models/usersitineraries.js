'use strict'
module.exports = function (sequelize, DataTypes) {
  var UsersItineraries = sequelize.define('UsersItineraries', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.STRING,
      references: {
        model: {
          tableName: 'Users'
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
    permissions: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  })
  return UsersItineraries
}
