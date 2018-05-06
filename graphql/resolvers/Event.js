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
        if (key !== 'googlePlaceData' && key !== 'LocationId') {
          temp[key] = data[key]
        }
      })

      if (data.googlePlaceData) {
        var newEvent = findOrCreateLocation(data.googlePlaceData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else if (data.LocationId) {
        temp.LocationId = data.LocationId
        newEvent = Promise.resolve(temp)
      } else if (!data.LocationId && !data.googlePlaceData) {
        newEvent = Promise.resolve(temp)
      }

      return db.Event.create(newEvent)
    },
    updateEvent: (__, data) => {
      let temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'googlePlaceData' && key !== 'LocationId') {
          temp[key] = data[key]
        }
      })
      if (data.googlePlaceData) {
        var updatesObj = findOrCreateLocation(data.googlePlaceData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else {
        updatesObj = Promise.resolve(temp)
      }
      return db.Event.findById(data.id)
        .then(found => {
          return found.update(updatesObj)
        })
    },
    deleteEvent: (__, data) => {
      return db.Event.destroy({
        where: {id: data.id},
        individualHooks: true
      })
    }
  }
}

module.exports = Event
