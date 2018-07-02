const db = require('../connectors')

const ReorderBlogContent = {
  Mutation: {
    reorderBlogContent: async (__, data) => {
      // console.log('input arr', data.input)
      let inputArr = data.input
      let reorderPromises = await Promise.all(inputArr.map(async e => {
        if (e.type === 'BlogHeading') {
          let headingRow = await db.BlogHeading.findById(e.modelId)
          return headingRow.update({loadSequence: e.loadSequence})
        } else if (e.type === 'Post') {
          let postRow = await db.Post.findById(e.modelId)
          return postRow.update({loadSequence: e.loadSequence})
        } else {
          return Promise.resolve(null)
        }
      }))

      console.log('resolved', reorderPromises)
      return reorderPromises
    }
  }
}

module.exports = ReorderBlogContent
