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
    createEvent: (__, data) => {
      let temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'locationData' && key !== 'LocationId') {
          temp[key] = data[key]
        }
      })

      // NEEDS TESTING. SO FAR NEW EVENT IS EMPTY EVENT. MAP MIGHT CREATE NEW EVENT DIRECTLY FROM LOCATIONOBJ.

      if (data.locationData) {
        let locationData = data.locationData
        if (locationData.verified) {
          var eventObj = findOrCreateLocation(locationData)
            .then(LocationId => {
              temp.LocationId = LocationId
              return temp
            })
        } else {
          // if unverified, create new row (custom locations r unique to user)
          let countryCode = data.locationData.countryCode
          let tempObjForLocation = {
            verified: false,
            name: data.locationData.name,
            address: data.locationData.address,
            latitude: data.locationData.latitude,
            longitude: data.locationData.longitude
          }
          if (countryCode) {
            var locationObj = db.Country.find({where: {code: countryCode}})
              .then(foundCountry => {
                tempObjForLocation.CountryId = foundCountry.id
                return tempObjForLocation
              })
          } else {
            locationObj = Promise.resolve(tempObjForLocation)
          }
          eventObj = locationObj
            .then(locationObj => {
              return db.Location.create({
                verified: false,
                name: locationObj.name,
                address: locationObj.address,
                latitude: locationObj.latitude,
                longitude: locationObj.longitude,
                CountryId: locationObj.CountryId
              })
            })
            .then(created => {
              temp.LocationId = created.id
              return temp
            })
        }
      } else if (data.LocationId) {
        temp.LocationId = data.LocationId
        eventObj = Promise.resolve(temp)
      } else if (!data.LocationId && !data.locationData) {
        eventObj = Promise.resolve(temp)
      }

      return eventObj
        .then(eventObj => {
          return db.Event.create(eventObj)
        })
    },
    updateEvent: (__, data) => {
      let temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'locationData' && key !== 'LocationId') {
          temp[key] = data[key]
        }
      })
      if (('locationData' in data) && data.locationData) {
        let locationData = data.locationData
        if (locationData.verified) {
          var updatesObj = findOrCreateLocation(locationData)
            .then(LocationId => {
              temp.LocationId = LocationId
              return temp
            })
        } else {
          // custom row
          let countryCode = data.locationData.countryCode
          let tempObjForLocation = {
            verified: false,
            name: data.locationData.name,
            address: data.locationData.address,
            latitude: data.locationData.latitude,
            longitude: data.locationData.longitude
          }
          if (countryCode) {
            var locationObj = db.Country.find({where: {code: countryCode}})
              .then(foundCountry => {
                tempObjForLocation.CountryId = foundCountry.id
                return tempObjForLocation
              })
          } else {
            locationObj = Promise.resolve(tempObjForLocation)
          }
          updatesObj = locationObj
            .then(locationObj => {
              return db.Location.create({
                verified: false,
                name: locationObj.name,
                address: locationObj.address,
                latitude: locationObj.latitude,
                longitude: locationObj.longitude,
                CountryId: locationObj.CountryId
              })
            })
            .then(created => {
              temp.LocationId = created.id
              return temp
            })
        }
      } else if (('locationData' in data) && !data.locationData) {
        temp.LocationId = null
        updatesObj = Promise.resolve(temp)
      } else {
        updatesObj = Promise.resolve(temp)
      }
      return updatesObj
        .then(updatesObj => {
          return db.Event.findById(data.id)
            .then(foundEvent => {
              return foundEvent.update(updatesObj)
            })
        })
    },
    deleteEvent: (__, data) => {
      // NEEDS CLEANUP FXN TO DESTROY ALL UNUSED CUSTOM ROWS.
      return db.Event.destroy({
        where: {id: data.id},
        individualHooks: true
      })
    }
  }
}

module.exports = Event
