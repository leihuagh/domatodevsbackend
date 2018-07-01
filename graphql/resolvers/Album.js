const db = require('../connectors')
const generateCloudStorageToken = require('./helpers/generateCloudStorageToken')
const fetch = require('node-fetch')

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
    getUserAlbums: async (__, data, context) => {
      console.log('context', context)
      let foundAlbums = await db.Album.findAll({
        where: {UserId: context.user},
        order: db.sequelize.col('id')
      })
      console.log('all user albums', foundAlbums)
      return foundAlbums
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
    updateAlbum: async (__, data) => {
      let updatesObj = {}
      if ('title' in data) {
        updatesObj.title = data.title
        if (data.title === '') {
          updatesObj.title = 'Untitled Album'
        }
      }
      if ('description' in data) {
        updatesObj.description = data.description
      }
      let foundAlbum = await db.Album.findById(data.id)
      return foundAlbum.update(updatesObj)
    },
    deleteAlbum: async (__, data) => {
      let AlbumId = data.id
      /*
      (X) find all media rows in album to be deleted
      (X) delete all mediaposts
      (X) delete media themselves (will cascade to set blog n header MediumId to null)
      (X) finally delete album
      */
      let cloudStorageToken = await generateCloudStorageToken()
        .then(tokenObj => {
          return tokenObj.token
        })

      let mediaArr = await db.Medium.findAll({where: {AlbumId: AlbumId}})

      // instead of pushing into arr, just map and return promise?
      await Promise.all(mediaArr.map(obj => {
        return db.MediaPosts.destroy({where: {MediumId: obj.id}})
      }))

      await Promise.all(mediaArr.map(obj => {
        if (obj.type === 'Photo' && obj.objectName) {
          let objectName = obj.objectName
          let replaceSlash = objectName.replace(/\//g, '%2F')
          let finalReplace = replaceSlash.replace(/\|/g, '%7C')
          return fetch(`${process.env.CLOUD_DELETE_URI}${finalReplace}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${cloudStorageToken}`
            }
          })
            .then(response => {
              if (response.status !== 204) {
                console.log('err?', response)
              }
            })
        } else {
          return true
        }
      }))

      await db.Medium.destroy({where: {AlbumId: AlbumId}, individualHooks: true})

      return db.Album.destroy({where: {id: AlbumId}})

      // return db.Medium.findAll({where: {AlbumId: AlbumId}})
      //   .then(mediaArr => {
      //     let promiseArr = []
      //     mediaArr.forEach(obj => {
      //       let deleteMediaPostsPromise = db.MediaPosts.destroy({where: {MediumId: obj.id}})
      //       promiseArr.push(deleteMediaPostsPromise)
      //     })
      //     return Promise.all(promiseArr)
      //       .then(values => {
      //         return mediaArr
      //       })
      //   })
      //   .then(mediaArr => {
      //     // delete media from cloud
      //     return cloudStorageToken
      //       .then(cloudStorageToken => {
      //         let cloudDeletePromiseArr = []
      //         // console.log('mediaArr', mediaArr)
      //         mediaArr.forEach(medium => {
      //           // console.log('medium', medium)
      //           if (medium.type === 'Photo' && medium.objectName) {
      //             let objectName = medium.objectName
      //             let replaceSlash = objectName.replace(/\//g, '%2F')
      //             let finalReplace = replaceSlash.replace(/\|/g, '%7C')
      //             return fetch(`${process.env.CLOUD_DELETE_URI}${finalReplace}`, {
      //               method: 'DELETE',
      //               headers: {
      //                 'Authorization': `Bearer ${cloudStorageToken}`
      //               }
      //             })
      //               .then(response => {
      //                 if (response.status !== 204) {
      //                   console.log('err?', response)
      //                 }
      //                 cloudDeletePromiseArr.push(true)
      //               })
      //           } else {
      //             cloudDeletePromiseArr.push(true)
      //           }
      //         }) // close for each
      //         return Promise.all(cloudDeletePromiseArr)
      //           .then(values => {
      //             return true
      //           })
      //       })
      //   })
      //   .then(() => {
      //     // delete all media rows
      //     // need individualHooks: true to trigger instance beforeDestroy hook in medium model. sets foreign key to null for affected blogs and headers
      //     return db.Medium.destroy({where: {AlbumId: AlbumId}, individualHooks: true})
      //   })
      //   .then(() => {
      //     // delete the album
      //     return db.Album.destroy({where: {id: AlbumId}})
      //   })
    }
  }
}

module.exports = Album
