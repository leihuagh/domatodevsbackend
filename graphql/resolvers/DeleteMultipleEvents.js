const db = require('../connectors')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

// NEEDS LOGIC TO CHECK IF LOCATION ROW NEEDS TO CLEAR

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
    }
  }
}
module.exports = DeleteMultipleEvents
