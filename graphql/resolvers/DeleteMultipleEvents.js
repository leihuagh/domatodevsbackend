const db = require('../connectors')
const deleteAttachmentsFromCloud = require('./helpers/deleteAttachmentsFromCloud')

// NEEDS LOGIC TO CHECK IF LOCATION ROW NEEDS TO CLEAR

const DeleteMultipleEvents = {
  Mutation: {
    deleteMultipleEvents: async (__, data) => {
      let inputArr = data.input // arr of Event ids

      let deleteEventPromiseArr = await Promise.all(inputArr.map(async EventId => {
        await deleteAttachmentsFromCloud(EventId)
        let eventToBeDeleted = await db.Event.findById(EventId)
        return eventToBeDeleted.destroy({individualHooks: true})
      }))
      return Promise.resolve(true)
    }
  }
}
module.exports = DeleteMultipleEvents
