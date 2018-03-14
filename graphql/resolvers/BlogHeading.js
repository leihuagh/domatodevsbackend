const db = require('../connectors')

const BlogHeading = {
  Query: {
    findBlogHeading: (__, data) => {
      return db.BlogHeading.findById(data.id)
    }
  }
}

module.exports = BlogHeading
