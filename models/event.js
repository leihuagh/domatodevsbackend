'use strict'

// EVENT REFERS TO EVENT IN A BLOGPOST. NOT ITINERARY
module.export = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    PostId: DataTypes.INTEGER,
    ParentEventId: DataTypes.INTEGER,
    // add self-reference association (event, subevent)
    loadSequence: DataTypes.INTEGER,
    content: DataTypes.STRING
  })

  Event.associate = function (models) {
    Event.belongsTo(models.Post)
    Event.belongsTo(models.Event, {
      as: 'ParentEvent',
      foreignKey: 'ParentEventId'
    })
    Event.hasMany(models.Event, {
      as: 'ChildEvent'
    })
    // Event.hasMany(models.Attachment)
  }

  return Event
}
