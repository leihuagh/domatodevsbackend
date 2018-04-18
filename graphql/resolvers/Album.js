const db = require('../connectors')

const Album = {
  Album: {
    media (album) {
      return album.getMedia()
    },
    user (album) {
      return album.getUser()
    }
  },
  Query: {
    findAlbum: (__, data) => {
      return db.Album.findById(data.id)
    },
    getUserAlbums: (__, data, context) => {
      console.log('context', context)
      return db.Album.findAll({
        where: {UserId: context.user},
        order: db.sequelize.col('id')
      })
        .then(albumsArr => {
          console.log('all user albums', albumsArr)
          return albumsArr
        })
    }
  },
  Mutation: {
    createAlbum: (__, data, context) => {
      // console.log('userId', context.user)
      let dateNow = new Date()
      // console.log('date', dateNow)
      let dateString = dateNow.toUTCString().substring(5, 16)
      // console.log('dateString', dateString)
      // let dateString = (new Date()).toUTCString().substring(5, 17)
      return db.Album.create({
        // UserId: context.user,
        UserId: data.UserId,
        title: data.title || `New Album (${dateString})`,
        description: data.description
      })
    },
    updateAlbum: (__, data) => {
      let updatesObj = {}
      if (data.hasOwnProperty('title')) {
        updatesObj.title = data.title
        if (data.title === '') {
          updatesObj.title = 'Untitled Album'
        }
      }
      if (data.hasOwnProperty('description')) {
        updatesObj.description = data.description
        // if (data.description === '') {
        //   updatesObj.description = 'No description available'
        // }
      }
      return db.Album.findById(data.id)
        .then(found => {
          return found.update(updatesObj)
        })
    },
    deleteAlbum: (__, data) => {
      let AlbumId = data.id
      /*
      (X) find all media rows in album to be deleted
      (X) delete all join table rows for each media. MediaBlogs, MediaPosts
      (X) delete media themselves
      (X) finally delete album
      ( ) KIV deleting join table rows will require a front-end reorder load sequence
      */
      return db.Medium.findAll({where: {AlbumId: AlbumId}})
        .then(mediaArr => {
          console.log('mediaArr', mediaArr)

          let promiseArr = []
          mediaArr.forEach(obj => {
            // delete from MediaBlog, MediaPost
            let MediaBlogPromise = db.MediaBlogs.destroy({where: {MediumId: obj.id}})
            let MediaPostPromise = db.MediaPosts.destroy({where: {MediumId: obj.id}})

            let deletePromise = Promise.all([MediaBlogPromise, MediaPostPromise])
              .then(values => {
                return true
              })
            promiseArr.push(deletePromise)
          })

          return Promise.all(promiseArr)
        })
        // NEED TO DELETE MEDIA FROM CLOUD
        .then(() => {
          // delete all media rows
          return db.Medium.destroy({where: {AlbumId: AlbumId}})
        })
        .then(() => {
          // delete the album
          return db.Album.destroy({where: {id: AlbumId}})
        })
    }
  }
}

module.exports = Album
