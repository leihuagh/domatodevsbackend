const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')

const Event = {
  Event: {
    location (event) {
      return event.getLocation()
    },
    attachments (event) {
      return event.getAttachments()
    }
  },
  Query: {
    findEvent: (__, data) => {
      return db.Event.findById(data.id)
    }
  },
  Mutation: {
    createEvent: async (__, data) => {
      let eventObj = {}
      Object.keys(data).forEach(key => {
        if (key !== 'locationData' && key !== 'LocationId') {
          eventObj[key] = data[key]
        }
      })

      // locationData, locationId, or none
      if (data.locationData) {
        if (data.locationData.verified) {
          let LocationId = await findOrCreateLocation(data.locationData)
          eventObj.LocationId = LocationId
        } else {
          // create custom row
          let {name, address, latitude, longitude, countryCode} = data.locationData
          let CountryId
          if (countryCode) {
            let foundCountry = await db.Country.find({where: {code: countryCode}})
            CountryId = foundCountry.id
          }
          let createdLocation = await db.Location.create({
            verified: false,
            name,
            address,
            latitude,
            longitude,
            CountryId
          })
          // console.log('createdLocation')
          eventObj.LocationId = createdLocation.id
        }
      } else if (data.LocationId) {
        eventObj.LocationId = data.LocationId
      }

      let createdEvent = await db.Event.create(eventObj)
      // console.log('createdEvent', createdEvent)
      return createdEvent
    },
    updateEvent: async (__, data) => {
      let updatesObj = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'locationData' && key !== 'LocationId') {
          updatesObj[key] = data[key]
        }
      })

      if (('locationData' in data) && data.locationData) {
        if (data.locationData.verified) {
          let LocationId = await findOrCreateLocation(data.locationData)
          updatesObj.LocationId = LocationId
        } else {
          // custom
          let {name, address, latitude, longitude, countryCode} = data.locationData
          let CountryId
          if (countryCode) {
            let foundCountry = await db.Country.find({where: {code: countryCode}})
            CountryId = foundCountry.id
          }

          let createdLocation = await db.Location.create({
            verified: false,
            name,
            address,
            latitude,
            longitude,
            CountryId
          })

          updatesObj.LocationId = createdLocation.id
        }
      } else if ('LocationId' in data) {
        updatesObj.LocationId = data.LocationId
      }

      let foundEvent = await db.Event.findById(data.id)
      return foundEvent.update(updatesObj)
    },
    deleteEvent: (__, data) => {
      // location rows are not deleted
      return db.Event.destroy({
        where: {id: data.id},
        individualHooks: true
      })
    }
  }
}

module.exports = Event
