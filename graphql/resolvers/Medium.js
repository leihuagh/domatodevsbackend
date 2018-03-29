const db = require('../connectors')

const Medium = {
  Query: {
    //
  },
  Mutation: {
    addMediaToBlog: (__, data) => {
      console.log('data', data)
      return db.MediaBlogs.create({
        MediumId: data.MediumId,
        BlogId: data.BlogId,
        loadSequence: data.loadSequence,
        caption: data.caption
      })
        .then(created => {
          console.log('created', created)
          return created
        })
    },
    removeMediaFromBlog: (__, data) => {
      console.log('data', data)
      // remove by join table row id.
      return db.MediaBlogs.destroy({where: {
        id: data.id
      }})
    }
    // updateMediaInBlog: (__, data) => {
    //   //
    // }
  }
}

module.exports = Medium
