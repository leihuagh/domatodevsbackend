const db = require('../connectors')

const BlogHeading = {
  Query: {
    findBlogHeading: (__, data) => {
      return db.BlogHeading.findById(data.id)
    }
  },
  Mutation: {
    createBlogHeading: (__, data) => {
      return db.BlogHeading.create({
        BlogId: data.BlogId,
        loadSequence: data.loadSequence,
        title: data.title
      })
        .then(created => {
          console.log('created', created)
          return created
        })
    },
    updateBlogHeading: (__, data) => {
      var updatesObj = {}
      let fields = ['loadSequence', 'title']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      // if (data.loadSequence) {
      //   updatesObj.loadSequence = data.loadSequence
      // }
      // if (data.title) {
      //   updatesObj.title = data.title
      // }
      return db.BlogHeading.findById(data.id)
        .then(found => {
          return found.update(updatesObj)
        })
    },
    deleteBlogHeading: (__, data) => {
      return db.BlogHeading.destroy({where: {id: data.id}})
    }
  }
}

module.exports = BlogHeading
