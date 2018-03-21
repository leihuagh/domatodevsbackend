'use strict'
module.exports = function (sequelize, DataTypes) {
  var UsersItineraries = sequelize.define('UsersItineraries', {
    UserId: DataTypes.STRING,
    ItineraryId: DataTypes.INTEGER,
    permissions: DataTypes.STRING
  })
  return UsersItineraries
}
