const db = require('../connectors')

const Medium = {
  Query: {
    findMedium: (__, data) => {
      return db.Medium.findById(data.id)
        .then(found => {
          console.log('found', found)
          return found
        })
    },
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
    // these only create/delete medium row in our db. need to handle cloud upload/delete separately in frontend
    createMedium: (__, data) => {
      return db.Medium.create({
        url: data.url,
        type: data.type
      })
    },
    deleteMedium: (__, data) => {
      return db.Medium.destroy({where: {id: data.id}})
    },

    /* ----------------------------- */

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
    reorderMediaBlog: (__, data) => {
      // console.log('data', data)
      let arr = data.input
      // console.log('arr', arr)
      let promiseArr = []
      arr.forEach(e => {
        let updatePromise = db.MediaBlogs.findById(e.id)
          .then(found => {
            return found.update({loadSequence: e.loadSequence})
          })
        promiseArr.push(updatePromise)
      })
      return Promise.all(promiseArr)
        .then(values => {
          console.log('values', values)
          return values
        })
    },

    /* ----------------------------- */

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
    },
    reorderMediaPost: (__, data) => {
      let arr = data.input
      let promiseArr = []
      arr.forEach(e => {
        let updatePromise = db.MediaPosts.findById(e.id)
          .then(found => {
            return found.update({loadSequence: e.loadSequence})
          })
        promiseArr.push(updatePromise)
      })
      return Promise.all(promiseArr)
        .then(values => {
          console.log('values', values)
          return values
        })
    }
  }
}

module.exports = Medium
