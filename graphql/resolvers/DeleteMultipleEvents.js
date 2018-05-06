const db = require('../connectors')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

const DeleteMultipleEvents = {
  Mutation: {
    deleteMultipleEvents: (__, data) => {
      let inputArr = data.input // arr of Event ids

      let promiseArr = []
      inputArr.forEach(id => {
        // delete all attachments for the event id from GCP,
        let awaitDeletesFromCloud = deleteAttachmentsFromCloud(id)

        // then delete event row(trigger hook to delete attachment rows)
        awaitDeletesFromCloud
          .then(done => {
            return db.Event.findById(id)
              .then(found => {
                return found.destroy({individualHooks: true})
              })
          })
        promiseArr.push(awaitDeletesFromCloud)
      })
      return Promise.all(promiseArr)
        .then(values => {
          console.log('values', values)
          return true
        })

      // let eventPromisesArr = []
      // input.forEach(e => {
      //   let attachmentPromisesArr = []
      //   if (e.type !== 'FlightBooking') {
      //     attachmentPromisesArr.push(deleteAttachmentsFromCloud(e.type, e.id))
      //   } else if (e.type === 'FlightBooking') {
      //     db.FlightBooking.findById(e.id)
      //       .then(booking => {
      //         booking.getFlightInstances()
      //           .then(instanceArr => {
      //             instanceArr.forEach(instance => {
      //               attachmentPromisesArr.push(deleteAttachmentsFromCloud('FlightInstance', instance.id))
      //             })
      //           })
      //       })
      //   }
      //   return Promise.all(attachmentPromisesArr)
      //     .then(isFinished => {
      //       var model = db[e.type].findById(e.id)
      //       const promise = model.then(found => {
      //         found.destroy({individualHooks: true})
      //         eventPromisesArr.push(promise)
      //       })
      //     })
      // })
      // return Promise.all(eventPromisesArr)
      //   .then(() => {
      //     return true
      //   })
    }
  }
}
module.exports = DeleteMultipleEvents
