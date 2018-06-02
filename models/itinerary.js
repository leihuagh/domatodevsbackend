'use strict'
module.exports = function (sequelize, DataTypes) {
  var Itinerary = sequelize.define('Itinerary', {
    name: DataTypes.STRING, // eg. Trip to Japan
    description: DataTypes.STRING,
    days: DataTypes.INTEGER, // needed
    startDate: DataTypes.INTEGER, // optional
    isPrivate: DataTypes.BOOLEAN
  })

  Itinerary.associate = function (models) {
    Itinerary.belongsToMany(models.User, {through: 'UsersItineraries'})
    Itinerary.belongsToMany(models.Country, {through: 'CountriesItineraries'})
    Itinerary.hasMany(models.Event)
  }

  Itinerary.beforeDestroy((instance, options) => {
    sequelize.models.UsersItineraries.destroy({where: {ItineraryId: instance.id}})
    sequelize.models.CountriesItineraries.destroy({where: {ItineraryId: instance.id}})
    // EVENT HAS HOOK TO DESTROY ATTACHMENTS
    sequelize.models.Event.destroy({where: {ItineraryId: instance.id}})
  })

  return Itinerary
}
