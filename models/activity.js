'use strict'
module.exports = function (sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    LocationId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    loadSequence: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    startTime: DataTypes.INTEGER,
    endTime: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingStatus: DataTypes.BOOLEAN,
    bookedThrough: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    attachment: DataTypes.STRING
  })

  Activity.associate = function (models) {
    Activity.belongsTo(models.Itinerary)
    Activity.belongsTo(models.Location)
  }

  return Activity
}
