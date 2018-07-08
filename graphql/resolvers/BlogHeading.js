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
    createBlogHeading: async (__, data) => {
      let createdHeading = await db.BlogHeading.create({
        BlogId: data.BlogId,
        loadSequence: data.loadSequence,
        title: data.title || 'Default header'
      })
      // console.log('createdHeading', createdHeading)
      return createdHeading
    },
    updateBlogHeading: async (__, data) => {
      var updatesObj = {}
      let fields = ['loadSequence', 'title', 'MediumId']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      let foundHeading = db.BlogHeading.findById(data.id)
      return foundHeading.update(updatesObj)
    },
    deleteBlogHeading: (__, data) => {
      return db.BlogHeading.destroy({where: {id: data.id}})
    }
  }
}

module.exports = BlogHeading
