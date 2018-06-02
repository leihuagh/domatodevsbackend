const db = require('../connectors')

const Itinerary = {
  Itinerary: {
    countries (itinerary) {
      return itinerary.getCountries()
    },
    owner (itinerary) {
      var ownerId = null
      return db.UsersItineraries.find({where: {
        ItineraryId: itinerary.id,
        permissions: 'owner'
      }})
        .then(found => {
          ownerId = found.UserId
          return db.User.findById(ownerId)
        })
    },
    events (itinerary) {
      // return eventsArr sorted by day, then loadSequence
      return itinerary.getEvents()
        .then(eventsArr => {
          return eventsArr.sort((a, b) => {
            return a.startDay - b.startDay || a.loadSequence - b.loadSequence
          })
        })
    }
  },
  Query: {
    allItineraries: () => {
      return db.Itinerary.findAll()
    },
    itinerariesByUser: (__, data, context) => {
      // this returns all itineraries for that user, regardless of owner or collab
      // console.log('context', context)
      // user id is auth0 id for domatodevs@gmail.com
      return db.User.findById(context.user)
        .then(user => {
          if (user) {
            return user.getItineraries()
          } else {
            return []
          }
        })
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
    createItinerary: (__, data) => {
      var newItinerary = {}
      var UserId = data.UserId
      // console.log('owner', UserId)
      Object.keys(data).forEach(key => {
        if (key !== 'UserId' && key !== 'CountryId') {
          newItinerary[key] = data[key]
        }
      })
      newItinerary.isPrivate = true
      let createdItineraryId = db.Itinerary.create(newItinerary)
        .then(created => {
          return created.id
        })

      return createdItineraryId
        .then(createdItineraryId => {
          return db.UsersItineraries.create({
            UserId: UserId,
            ItineraryId: createdItineraryId,
            permissions: 'owner'
          })
            .then(() => {
              return createdItineraryId
            })
        })
        .then(createdItineraryId => {
          // if CountryId is passed, create join table row as well
          if (data.CountryId) {
            return db.CountriesItineraries.create({
              CountryId: data.CountryId,
              ItineraryId: createdItineraryId
            })
              .then(() => {
                return createdItineraryId
              })
          } else {
            return createdItineraryId
          }
        })
        .then(createdItineraryId => {
          return db.Itinerary.findById(createdItineraryId)
        })
    },
    updateItineraryDetails: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id') {
          updates[key] = data[key]
        }
      })
      return db.Itinerary.findById(data.id)
        .then(found => {
          return found.update(updates)
        })
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
