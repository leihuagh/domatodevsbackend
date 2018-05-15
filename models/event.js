'use strict'
module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    ItineraryId: DataTypes.INTEGER,
    // user defined string like brunch, train etc
    eventType: DataTypes.STRING,
    startDay: DataTypes.INTEGER,
    // unix secs since midnight
    startTime: DataTypes.INTEGER,
    endTime: DataTypes.INTEGER,
    // load seq is within the day
    loadSequence: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    // cost: DataTypes.INTEGER,
    cost: DataTypes.STRING,
    currency: DataTypes.STRING,
    bookingService: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    LocationId: DataTypes.INTEGER, // Location data is either verified or custom
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  Event.associate = function (models) {
    Event.belongsTo(models.Itinerary)
    Event.belongsTo(models.Location)
    // Event.belongsTo(models.CustomLocation)
    // custom location table, or location table with extra property (custom - Boolean)?
    Event.hasMany(models.Attachment)
  }

  Event.beforeDestroy((instance, options) => {
    return sequelize.models.Attachment.destroy({where: {EventId: instance.id}})
  })

  return Event
}
