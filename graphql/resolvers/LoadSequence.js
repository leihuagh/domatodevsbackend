const db = require('../connectors')

const LoadSequence = {
  Mutation: {
    changingLoadSequence: (__, data) => {
      let promiseArr = []
      let inputArr = data.input
      inputArr.forEach(input => {
        let updatePromise = db.Event.findById(input.EventId)
          .then(foundEvent => {
            return foundEvent.update({
              startDay: input.startDay,
              loadSequence: input.loadSequence
            })
          })
        promiseArr.push(updatePromise)
      })
      return Promise.all(promiseArr)
        .then(values => {
          console.log('values', values)
          return true
        })
    }
  }
}
module.exports = LoadSequence
