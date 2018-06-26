'use strict'
module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    LocationId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Locations'
        },
        key: 'id'
      }
    },
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  Event.associate = function (models) {
    Event.belongsTo(models.Itinerary)
    Event.belongsTo(models.Location)
    Event.hasMany(models.Attachment)
  }

  Event.beforeDestroy((instance, options) => {
    return sequelize.models.Attachment.destroy({where: {EventId: instance.id}})
  })

  return Event
}
