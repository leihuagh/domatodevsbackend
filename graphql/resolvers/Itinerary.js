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
    },
    timeFromPublishDate (itinerary) {
      let momentPublishDate = moment(itinerary.createdAt)
      let timeElapsed = momentPublishDate.fromNow()
      // console.log('timeElapsed', timeElapsed)
      return timeElapsed
    }
  },
  Query: {
    // allItineraries: () => {
    //   return db.Itinerary.findAll()
    // },
    getAllPublishedItineraries: () => {
      return db.Itinerary.findAll({
        where: {isPrivate: false},
        order: db.sequelize.col('createdAt')
      })
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
        // .then(createdItineraryId => {
        //   // if CountryId is passed, create join table row as well
        //   if (data.CountryId) {
        //     return db.CountriesItineraries.create({
        //       CountryId: data.CountryId,
        //       ItineraryId: createdItineraryId
        //     })
        //       .then(() => {
        //         return createdItineraryId
        //       })
        //   } else {
        //     return createdItineraryId
        //   }
        // })
        .then(createdItineraryId => {
          return db.Itinerary.findById(createdItineraryId)
        })
    },
    updateItineraryDetails: (__, data) => {
      var updates = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'countries') {
          updates[key] = data[key]
        }
      })

      return db.Itinerary.findById(data.id)
        .then(foundItinerary => {
          let currentDays = foundItinerary.days
          let newDays = updates.days

          if (newDays < currentDays) {
            // console.log('delete events')
            return db.Event.destroy({where: {
              ItineraryId: data.id,
              startDay: {
                [Op.gt]: newDays
              }
            }})
              .then(() => {
                return foundItinerary
              })
          } else {
            return foundItinerary
          }
        })
        .then(foundItinerary => {
          // check countries arr
          let incomingCountriesArr = data.countries
          let currentCountriesArr = foundItinerary.getCountries()
            .then(joinTableRows => {
              let idArr = joinTableRows.map(e => {
                // keep all ids as strings for lodash comparison
                return (e.dataValues.id).toString()
              })
              return idArr
            })

          currentCountriesArr
            .then(currentCountriesArr => {
              // console.log('ID ARRAY', currentCountriesArr)
              // console.log('INCOMING IDS', incomingCountriesArr)
              let countriesToAdd = _.difference(incomingCountriesArr, currentCountriesArr)
              let countriesToRemove = _.difference(currentCountriesArr, incomingCountriesArr)

              let countriesPromiseArr = []

              // console.log('countries to add', countriesToAdd)
              // console.log('countries to remove', countriesToRemove)

              countriesToAdd.forEach(CountryId => {
                let addRowPromise = db.CountriesItineraries.create({
                  ItineraryId: data.id,
                  CountryId: CountryId
                })
                countriesPromiseArr.push(addRowPromise)
              })
              countriesToRemove.forEach(CountryId => {
                let removeRowPromise = db.CountriesItineraries.destroy({where: {
                  ItineraryId: data.id,
                  CountryId: CountryId
                }})
                countriesPromiseArr.push(removeRowPromise)
              })

              return Promise.all(countriesPromiseArr)
                // .then(returning => {
                //   console.log('returning', returning)
                // })
            })
          return foundItinerary
        })
        .then(foundItinerary => {
          return foundItinerary.update(updates)
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
