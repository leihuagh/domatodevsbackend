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

      // LOCATIONDATA LOGIC NEEDS REWRITE! DONT PASS KEY FIRST.
      if (data.locationData) {
        var newEvent = findOrCreateLocation(data.locationData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else if (data.LocationId) {
        temp.LocationId = data.LocationId
        newEvent = Promise.resolve(temp)
      } else if (!data.LocationId && !data.locationData) {
        newEvent = Promise.resolve(temp)
      }

      return db.Event.create(newEvent)
    },
    updateEvent: (__, data) => {
      let temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'locationData' && key !== 'LocationId') {
          temp[key] = data[key]
        }
      })
      // LOCATIONDATA NEEDS REWRITE! DONT PASS KEY FIRST.
      if (data.locationData) {
        var updatesObj = findOrCreateLocation(data.locationData)
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
