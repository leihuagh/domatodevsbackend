'use strict'
module.exports = function (sequelize, DataTypes) {
  var Itinerary = sequelize.define('Itinerary', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    days: {
      type: DataTypes.INTEGER
    },
    startDate: {
      type: DataTypes.INTEGER
    },
    isPrivate: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })

  Itinerary.associate = function (models) {
    Itinerary.belongsToMany(models.User, {through: 'UsersItineraries'})
    Itinerary.belongsToMany(models.Country, {through: 'CountriesItineraries'})
    Itinerary.hasMany(models.Event)

    Itinerary.hasMany(models.Blog)
  }

  Itinerary.beforeDestroy((instance, options) => {
    sequelize.models.UsersItineraries.destroy({where: {ItineraryId: instance.id}})
    sequelize.models.CountriesItineraries.destroy({where: {ItineraryId: instance.id}})
    // EVENT HAS HOOK TO DESTROY ATTACHMENTS
    sequelize.models.Event.destroy({where: {ItineraryId: instance.id}})
  })

  return Itinerary
}
