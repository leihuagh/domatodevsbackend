const db = require('../connectors')

const LoadSequence = {
  Mutation: {
    changingLoadSequence: async (__, data) => {
      let inputArr = data.input
      let updatePromiseArr = await Promise.all(inputArr.map(async input => {
        let event = await db.Event.findById(input.EventId)
        return event.update({
          startDay: input.startDay,
          loadSequence: input.loadSequence
        })
      }))

      console.log('resolved values', updatePromiseArr)
      return Promise.resolve(true)
    }
  }
}
module.exports = LoadSequence
