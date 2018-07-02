const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../connectors')
const _ = require('lodash')
const moment = require('moment')

const Itinerary = {
  Itinerary: {
    countries (itinerary) {
      return itinerary.getCountries()
    },
    async owner (itinerary) {
      let joinTableRow = await db.UsersItineraries.find({where: {
        ItineraryId: itinerary.id,
        permissions: 'owner'
      }})
      let UserId = joinTableRow.UserId
      return db.User.findById(UserId)
    },
    async events (itinerary) {
      let eventsArr = await itinerary.getEvents()

      return eventsArr.sort((a, b) => {
        return a.startDay - b.startDay || a.loadSequence - b.loadSequence
      })
    },
    timeFromPublishDate (itinerary) {
      let momentPublishDate = moment(itinerary.createdAt)
      let timeElapsed = momentPublishDate.fromNow()
      // console.log('timeElapsed', timeElapsed)
      return timeElapsed
    }
  },
  Query: {
    getAllPublishedItineraries: () => {
      return db.Itinerary.findAll({
        where: {isPrivate: false},
        order: db.sequelize.col('createdAt')
      })
    },
    itinerariesByUser: async (__, data, context) => {
      // this returns all itineraries for that user, regardless of owner or collab
      // console.log('context', context)
      // user id is auth0 id for domatodevs@gmail.com
      let user = await db.User.findById(context.user)

      if (user) {
        return user.getItineraries()
      } else {
        return []
      }
    },
    findItinerary: (__, data, context) => {
      return db.Itinerary.findById(data.id)
        .catch(err => {
          return err
        })
    },
    findCountriesItineraries: (__, data) => {
      return db.CountriesItineraries.find({
        where: {
          CountryId: data.CountryId,
          ItineraryId: data.ItineraryId
        }
      })
    },
    permissions: (__, data) => {
      return db.UsersItineraries.find({
        where: {
          UserId: data.UserId,
          ItineraryId: data.ItineraryId
        }
      })
    }
  },
  Mutation: {
    createItinerary: async (__, data) => {
      let newItinerary = {}
      let UserId = data.UserId
      // console.log('owner', UserId)
      Object.keys(data).forEach(key => {
        if (key !== 'UserId' && key !== 'CountryId') {
          newItinerary[key] = data[key]
        }
      })
      newItinerary.isPrivate = true

      let createdItinerary = await db.Itinerary.create(newItinerary)

      await db.UsersItineraries.create({
        UserId: UserId,
        ItineraryId: createdItinerary.id,
        permissions: 'owner'
      })

      return createdItinerary
    },
    updateItineraryDetails: async (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'countries') {
          updates[key] = data[key]
        }
      })

      let foundItinerary = await db.Itinerary.findById(data.id)

      let currentDays = foundItinerary.days
      let newDays = updates.days

      if (newDays < currentDays) {
        await db.Event.destroy({where: {
          ItineraryId: data.id,
          startDay: {
            [Op.gt]: newDays
          }
        }})
      }

      let incomingCountriesArr = data.countries

      let currentCountriesArr = await foundItinerary.getCountries()
        .then(joinTableRows => {
          return joinTableRows.map(e => {
            return (e.dataValues.id).toString()
          })
        })

      let countriesToAdd = _.difference(incomingCountriesArr, currentCountriesArr)
      let countriesToRemove = _.difference(currentCountriesArr, incomingCountriesArr)

      await Promise.all(countriesToAdd.map(id => {
        return db.CountriesItineraries.create({
          ItineraryId: data.id,
          CountryId: id
        })
      }))
      await Promise.all(countriesToRemove.map(id => {
        return db.CountriesItineraries.destroy({where: {
          ItineraryId: data.id,
          CountryId: id
        }})
      }))

      return foundItinerary.update(updates)
    },
    createCountriesItineraries: (__, data) => {
      return db.CountriesItineraries.findOrCreate({
        where: {
          CountryId: data.CountryId,
          ItineraryId: data.ItineraryId
        }
      })
        .spread((foundOrCreated, newRow) => {
          return foundOrCreated
        })
    },
    deleteCountriesItineraries: (__, data) => {
      return db.CountriesItineraries.destroy({
        where: {
          CountryId: data.CountryId,
          ItineraryId: data.ItineraryId
        }
      })
    },
    deleteItinerary: (__, data) => {
      // need to gate by user permissions in context
      const id = data.id
      return db.Itinerary.destroy({where: {id: id}, individualHooks: true})
      // beforeDestroy hook in itinerary handles destroying all association
    }
  }
}
module.exports = Itinerary
