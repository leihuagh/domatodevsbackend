const db = require('../connectors')

const Medium = {
  Query: {
    findMediaBlog: (__, data) => {
      return db.MediaBlogs.findById(data.id)
        .then(found => {
          console.log('found', found)
          return found
        })
    },
    findMediaPost: (__, data) => {
      return db.MediaPosts.findById(data.id)
        .then(found => {
          console.log('found', found)
          return found
        })
    }
  },
  Mutation: {
    createMediaBlog: (__, data) => {
      // console.log('data', data)
      return db.MediaBlogs.create({
        MediumId: data.MediumId,
        BlogId: data.BlogId,
        loadSequence: data.loadSequence,
        caption: data.caption
      })
        .then(created => {
          // console.log('created', created)
          return created
        })
    },
    deleteMediaBlog: (__, data) => {
      console.log('data', data)
      // remove by join table row id.
      return db.MediaBlogs.destroy({where: {
        id: data.id
      }})
    },
    updateMediaBlog: (__, data) => {
      // console.log('data received', data)
      // join table row id
      var updatesObj = {}
      if (data.loadSequence) {
        updatesObj.loadSequence = data.loadSequence
      }
      if (data.caption) {
        updatesObj.caption = data.caption
      }
      return db.MediaBlogs.findById(data.id)
        .then(found => {
          return found.update(updatesObj)
        })
    },
    createMediaPost: (__, data) => {
      // console.log('data', data)
      return db.MediaPosts.create({
        MediumId: data.MediumId,
        PostId: data.PostId,
        loadSequence: data.loadSequence,
        caption: data.caption
      })
        .then(created => {
          console.log('created', created)
          return created
        })
    },
    deleteMediaPost: (__, data) => {
      return db.MediaPosts.destroy({where: {id: data.id}})
    },
    updateMediaPost: (__, data) => {
      var updatesObj = {}
      if (data.loadSequence) {
        updatesObj.loadSequence = data.loadSequence
      }
      if (data.caption) {
        updatesObj.caption = data.caption
      }
      return db.MediaPosts.findById(data.id)
        .then(found => {
          return found.update(updatesObj)
        })
    }
  }
}

module.exports = Medium
