const db = require('../connectors')

const Medium = {
  Medium: {
    album (medium) {
      return medium.getAlbum()
    }
  },
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
    // frontend will pass an arr of medium to create. might be photo or video
    // createMedium: (__, data) => {
    //   return db.Medium.create({
    //     type: data.type,
    //     imageUrl: data.imageUrl,
    //     youtubeUrl: data.youtubeUrl
    //   })
    // },
    // type is either Photo or Youtube
    createMedia: (__, data) => {
      let mediaInputArr = data.media
      let promiseArr = []
      mediaInputArr.forEach(input => {
        let createPromise = db.Medium.create({
          AlbumId: data.AlbumId,
          type: input.type,
          objectName: input.objectName,
          imageUrl: input.imageUrl,
          youtubeUrl: input.youtubeUrl
        })
        promiseArr.push(createPromise)
      })
      return Promise.all(promiseArr)
        .then(values => {
          console.log('values', values)
          return true
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
      let fields = ['loadSequence', 'caption']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      // if (data.loadSequence) {
      //   updatesObj.loadSequence = data.loadSequence
      // }
      // if (data.caption) {
      //   updatesObj.caption = data.caption
      // }
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
      let fields = ['loadSequence', 'caption']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      // if (data.loadSequence) {
      //   updatesObj.loadSequence = data.loadSequence
      // }
      // if (data.caption) {
      //   updatesObj.caption = data.caption
      // }
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
