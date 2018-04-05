const db = require('../connectors')

const ReorderBlogContent = {
  Mutation: {
    reorderBlogContent: (__, data) => {
      // console.log('input arr', data.input)
      let promiseArr = []
      let inputArr = data.input
      inputArr.forEach(e => {
        let updatePromise
        if (e.type === 'BlogHeading') {
          updatePromise = db.BlogHeading.findById(e.modelId)
            .then(found => {
              return found.update({loadSequence: e.loadSequence})
            })
        } else if (e.type === 'Post') {
          updatePromise = db.Post.findById(e.modelId)
            .then(found => {
              return found.update({loadSequence: e.loadSequence})
            })
        } else {
          return Promise.resolve(null)
        }
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

module.exports = ReorderBlogContent
