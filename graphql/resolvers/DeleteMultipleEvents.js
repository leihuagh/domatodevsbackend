const db = require('../connectors')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

const DeleteMultipleEvents = {
  Mutation: {
    deleteMultipleEvents: (__, data) => {
      var input = data.input
      let eventPromisesArr = []
      input.forEach(e => {
        let attachmentPromisesArr = []
        if (e.type !== 'FlightBooking') {
          attachmentPromisesArr.push(deleteAttachmentsFromCloud(e.type, e.id))
        } else if (e.type === 'FlightBooking') {
          db.FlightBooking.findById(e.id)
          .then(booking => {
            booking.getFlightInstances()
            .then(instanceArr => {
              instanceArr.forEach(instance => {
                attachmentPromisesArr.push(deleteAttachmentsFromCloud('FlightInstance', instance.id))
              })
            })
          })
        }
        return Promise.all(attachmentPromisesArr)
        .then(isFinished => {
          var model = db[e.type].findById(e.id)
          const promise = model.then(found => {
            found.destroy({individualHooks: true})
            eventPromisesArr.push(promise)
          })
        })
      })
      return Promise.all(eventPromisesArr)
      .then(() => {
        return true
      })
    }
  }
}
module.exports = DeleteMultipleEvents
