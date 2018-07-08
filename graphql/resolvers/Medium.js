const db = require('../connectors')
const generateCloudStorageToken = require('./helpers/generateCloudStorageToken')
const fetch = require('node-fetch')

const Medium = {
  Medium: {
    album (medium) {
      return medium.getAlbum()
    }
  },
  Query: {
    findMedium: (__, data) => {
      return db.Medium.findById(data.id)
    },
    findMediaPost: (__, data) => {
      return db.MediaPosts.findById(data.id)
    }
  },
  Mutation: {
    // type is either Photo or Youtube
    createMedia: async (__, data) => {
      let mediaInputArr = data.media

      let createMediaPromises = await Promise.all(mediaInputArr.map(async input => {
        let {type, objectName, imageUrl, youtubeUrl} = input
        return db.Medium.create({
          AlbumId: data.AlbumId,
          type,
          objectName,
          imageUrl,
          youtubeUrl
        })
      }))

      console.log('resolved promises', createMediaPromises)
      return Promise.resolve(true)
    },
    /*
    ( ) exchange credentials for cloud token
    ( ) for each MediumId, find MediaPost and delete
    ( ) if type is 'Photo', delete from cloud
    ( ) finally, delete Medium row
    ( ) wait for all medium row promises. then return boolean
    */
    deleteMedia: async (__, data) => {
      // console.log('arr', data.input)
      let inputArr = data.input
      let cloudStorageToken = await generateCloudStorageToken()
        .then(tokenObj => {
          return tokenObj.token
        })

      let deleteMediaPromises = await Promise.all(inputArr.map(async MediumId => {
        // delete mediapost, delete from cloud, delete media itself
        await db.MediaPosts.destroy({where: {MediumId: MediumId}})

        let foundMedium = await db.Medium.findById(MediumId)
        if (foundMedium.type === 'Photo' && foundMedium.objectName) {
          let objectName = foundMedium.objectName
          let replaceSlash = objectName.replace(/\//g, '%2F')
          let finalReplace = replaceSlash.replace(/\|/g, '%7C')

          await fetch(`${process.env.CLOUD_DELETE_URI}${finalReplace}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${cloudStorageToken}`
            }
          })
            .then(response => {
              if (response.status !== 204) {
                console.log('err?', response)
              }
              return true
            })
        }

        return foundMedium.destroy()
      }))

      console.log('resolved', deleteMediaPromises)
      return Promise.resolve(true)
    },

    moveMediaToAlbum: async (__, data) => {
      let newAlbumId = data.AlbumId
      let mediumIdArr = data.media

      let updatePromises = await Promise.all(mediumIdArr.map(async id => {
        let foundMedium = await db.Medium.findById(id)
        return foundMedium.update({AlbumId: newAlbumId})
      }))

      // console.log('resolved updates arr', updatePromises)
      return Promise.resolve(true)
    },

    /* ----------------------------- */

    createMediaPost: async (__, data) => {
      // console.log('data', data)
      let {MediumId, PostId, loadSequence, caption} = data
      let createdMediaPostsRow = await db.MediaPosts.create({
        MediumId,
        PostId,
        loadSequence,
        caption
      })
      // console.log('created', createdMediaPostsRow)
      return createdMediaPostsRow
    },
    deleteMediaPost: (__, data) => {
      return db.MediaPosts.destroy({where: {id: data.id}})
    },
    updateMediaPost: async (__, data) => {
      var updatesObj = {}
      let fields = ['loadSequence', 'caption']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      let mediaPostsRow = await db.MediaPosts.findById(data.id)
      return mediaPostsRow.update(updatesObj)
    },
    reorderMediaPost: async (__, data) => {
      let inputArr = data.input

      let reorderPromises = await Promise.all(inputArr.map(async input => {
        let mediaPostsRow = await db.MediaPosts.findById(input.id)
        return mediaPostsRow.update({loadSequence: input.loadSequence})
      }))

      console.log('resolved arr', reorderPromises)
      return reorderPromises
    }
  }
}

module.exports = Medium
