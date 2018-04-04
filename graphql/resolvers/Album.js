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
      return db.Album.findAll({where: {UserId: context.user}})
        .then(albumsArr => {
          console.log('all user albums', albumsArr)
          return albumsArr
        })
    }
  },
  Mutation: {
    createAlbum: (__, data, context) => {
      // console.log('userId', context.user)
      return db.Album.create({
        // UserId: context.user,
        UserId: data.UserId,
        title: data.title,
        description: data.description
      })
    },
    updateAlbum: (__, data) => {
      let updatesObj = {}
      if (data.hasOwnProperty('title')) {
        updatesObj.title = data.title
      }
      if (data.hasOwnProperty('description')) {
        updatesObj.description = data.description
      }
      return db.Album.findById(data.id)
        .then(found => {
          return found.update(updatesObj)
        })
    }
    // deleteAlbum: (__, data) => {
    //   // cascade and delete all media. if mediablog, or mediapost exist, delete those rows
    //   // if join table rows r deleted, reorder remaining media load seq.
    // }
  }
}

module.exports = Album
