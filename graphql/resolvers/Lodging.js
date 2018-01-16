const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')
const createAllAttachments = require('./helpers/createAllAttachments')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

const Lodging = {
  Lodging: {
    itinerary (lodging) {
      return lodging.getItinerary()
    },
    location (lodging) {
      return lodging.getLocation()
    },
    attachments (lodging) {
      return lodging.getAttachments()
    }
  },
  Query: {
    findLodging: (__, data) => {
      return db.Lodging.findById(data.id)
    }
  },
  Mutation: {
    createLodging: (__, data) => {
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'googlePlaceData' && key !== 'LocationId') {
          temp[key] = data[key]
        }
      })

      if (data.googlePlaceData) {
        var newLodging = findOrCreateLocation(data.googlePlaceData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else if (data.LocationId) {
        temp.LocationId = data.LocationId
        newLodging = Promise.resolve(temp)
      } else if (!data.LocationId && !data.googlePlaceData) {
        newLodging = Promise.resolve(temp)
      }

      return newLodging.then(newLodging => {
        return db.Lodging.create(newLodging)
          .then(created => {
            if (data.attachments) {
              createAllAttachments(data.attachments, 'Lodging', created.id)
                // check if helper returns true/false
            }
            return created.id
          })
          .then(createdId => {
            return db.Lodging.findById(createdId)
          })
      })
    },
    updateLodging: (__, data) => {
      var temp = {}
      Object.keys(data).forEach(key => {
        if (key !== 'id' && key !== 'googlePlaceData') {
          temp[key] = data[key]
        }
      })

      if (data.googlePlaceData) {
        var updateObj = findOrCreateLocation(data.googlePlaceData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else {
        updateObj = Promise.resolve(temp)
      }

      return updateObj.then(updateObj => {
        return db.Lodging.findById(data.id)
          .then(found => {
            return found.update(updateObj)
          })
      })
    },
    deleteLodging: (__, data) => {
      var deleteAll = deleteAttachmentsFromCloud('Lodging', data.id)

      return deleteAll
      .then(isFinished => {
        console.log('isFinished', isFinished)
        return db.Lodging.destroy({where: {id: data.id}, individualHooks: true})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}

module.exports = Lodging
