const db = require('../connectors')

const BlogHeading = {
  BlogHeading: {
    medium (blogHeading) {
      return blogHeading.getMedium()
    }
  },
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
        title: data.title || 'Default header'
      })
        .then(created => {
          console.log('created', created)
          return created
        })
    },
    updateBlogHeading: (__, data) => {
      var updatesObj = {}
      let fields = ['loadSequence', 'title', 'MediumId']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
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
