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
      return itinerary.getEvents()
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
        if (key !== 'UserId') {
          newItinerary[key] = data[key]
        }
      })
      return db.Itinerary.create(newItinerary)
        .then(createdItinerary => {
          return db.UsersItineraries.create({
            UserId: UserId,
            ItineraryId: createdItinerary.id,
            permissions: 'owner'
          })
            .then(() => {
              return db.Itinerary.findById(createdItinerary.id)
            })
        })
      // if (data.CountryId) {
      //   newItinerary.CountryId = data.CountryId
      //
      //   return db.Itinerary.create(newItinerary)
      //     .then(createdItinerary => {
      //       db.CountriesItineraries.create({
      //         ItineraryId: createdItinerary.id,
      //         CountryId: data.CountryId
      //       })
      //       db.UsersItineraries.create({
      //         ItineraryId: createdItinerary.id,
      //         UserId: data.UserId,
      //         permissions: 'owner'
      //       })
      //       return createdItinerary
      //     })
      //     .then(createdItinerary => {
      //       return db.Itinerary.findById(createdItinerary.id)
      //     })
      // } else {
      //   return db.Itinerary.create(newItinerary)
      //     .then(createdItinerary => {
      //       return db.UsersItineraries.create({
      //         UserId: data.UserId,
      //         ItineraryId: createdItinerary.id,
      //         permissions: 'owner'
      //       })
      //         .then(() => {
      //           return db.Itinerary.findById(createdItinerary.id)
      //         })
      //     })
      // }
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
      return db.Country.find({where: {code: data.countryCode}})
        .then(found => {
          return db.CountriesItineraries.findCreateFind({where: {
            CountryId: found.id,
            ItineraryId: data.ItineraryId
          }})
            .then(results => {
              return results[0]
            })
        })
    },
    deleteCountriesItineraries: (__, data) => {
      return db.CountriesItineraries.destroy({
        where: {
          CountryId: data.CountryId,
          ItineraryId: data.ItineraryId
        }
      })
        .then(status => {
          return status
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
