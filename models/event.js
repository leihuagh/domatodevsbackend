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
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingService: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    // if verified -> means use dropdown -> select. uses google data strictly (name + address + openingHours + latlng etc). modifying name, changing address, opening hours etc makes it not verified, retrieve info from other table (clone the row into other table)
    locationVerified: DataTypes.BOOLEAN,
    LocationId: DataTypes.INTEGER, // data as returned from google
    // CustomLocationId: DataTypes.INTEGER // user editable
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
