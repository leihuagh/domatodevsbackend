const db = require('../connectors')
const _ = require('lodash')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')
const findOrCreateHashtag = require('./helpers/findOrCreateHashtag')

const Post = {
  Post: {
    blog (post) {
      return post.getBlog()
    },
    hashtags (post) {
      return post.getHashtags()
    },
    location (post) {
      return post.getLocation()
    },
    async media (post) {
      // MAKE MEDIAPOSTOBJECT
      let PostId = post.id

      let mediaPostsRows = await db.MediaPosts.findAll({where: {PostId: PostId}})
      let constructedRows = await Promise.all(mediaPostsRows.map(async join => {
        // each row join
        let mediumRow = await db.Medium.findById(join.MediumId)
        let mergedObj = {
          ...join.dataValues,
          type: mediumRow.type,
          AlbumId: mediumRow.AlbumId,
          objectName: mediumRow.objectName,
          imageUrl: mediumRow.imageUrl,
          youtubeUrl: mediumRow.youtubeUrl
        }
        return Promise.resolve(mergedObj)
      }))

      console.log('constructedRows', constructedRows)
      return constructedRows.sort((a, b) => {
        return a.loadSequence - b.loadSequence
      })
    }
  },
  Query: {
    findPost: (__, data) => {
      return db.Post.findById(data.id)
    }
  },
  Mutation: {
    createPost: async (__, data) => {
      console.log('data', data)
      let createdPost = await db.Post.create({
        BlogId: data.BlogId,
        loadSequence: data.loadSequence,
        title: data.title || 'Default title'
      })
      return createdPost
    },
    updatePost: async (__, data) => {
      console.log('RECEIVED IN UPDATEPOST RESOLVER', data)
      var updatesObj = {}
      var fields = ['loadSequence', 'title', 'textContent', 'eventType', 'bucketCategory', 'startDay', 'startTime', 'endTime']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })

      // either pass locationData, or LocationId directly
      if (data.locationData) {
        // this is for verified location only
        let LocationId = await findOrCreateLocation(data.locationData)
        updatesObj.LocationId = LocationId
      } else if ('LocationId' in data) {
        // if LocationId is passed, or pass with null
        updatesObj.LocationId = data.LocationId
      }

      // check hashtags
      let incomingHashtags = data.hashtags
      let hashtagsPostsRows = await db.HashtagsPosts.findAll({where: {PostId: data.id}})
      let currentHashtags = await Promise.all(hashtagsPostsRows.map(async row => {
        let indivHashtagRow = await db.Hashtag.findById(row.HashtagId)
        return indivHashtagRow.name
      }))
      if (incomingHashtags) {
        let hashtagsToRemoveFromPost = _.difference(currentHashtags, incomingHashtags)
        let hashtagsToAddToPost = _.difference(incomingHashtags, currentHashtags)
        await Promise.all(hashtagsToRemoveFromPost.map(async name => {
          let hashtagRow = await db.Hashtag.find({where: {name: name}})
          return db.HashtagsPosts.destroy({where: {
            PostId: data.id,
            HashtagId: hashtagRow.id
          }})
        }))
        await Promise.all(hashtagsToAddToPost.map(async name => {
          let createdHashtagId = await findOrCreateHashtag(name)
          return db.HashtagsPosts.create({
            PostId: data.id,
            HashtagId: createdHashtagId
          })
        }))
      }

      // check media
      let incomingMediaArr = data.media
      if (incomingMediaArr) {
        let mediaPostsRows = await db.MediaPosts.findAll({where: {PostId: data.id}})
        let currentMediaArr = mediaPostsRows.map(row => {
          return row.dataValues
        })
        console.log('currentMediaArr', currentMediaArr)

        // use loose equals. sequelize MediumId is int, but apollo may pass type ID as int, or numeric string
        let mediaToRemoveFromPost = _.differenceWith(currentMediaArr, incomingMediaArr, function (arrVal, otherVal) {
          return arrVal.MediumId == otherVal.MediumId
        })
        console.log('mediaToRemoveFromPost', mediaToRemoveFromPost)
        let mediaToAddToPost = _.differenceWith(incomingMediaArr, currentMediaArr, function (arrVal, otherVal) {
          return arrVal.MediumId == otherVal.MediumId
        })
        console.log('mediaToAddToPost', mediaToAddToPost)
        // media to update are the objs in the incoming arr which match the MediumId of currentArr.
        let mediaToUpdate = _.intersectionWith(incomingMediaArr, currentMediaArr, function (arrVal, otherVal) {
          return arrVal.MediumId == otherVal.MediumId
        })
        console.log('mediaToUpdate', mediaToUpdate)

        await Promise.all(mediaToRemoveFromPost.map(row => {
          return db.MediaPosts.destroy({where: {
            PostId: data.id,
            MediumId: row.id
          }})
        }))
        await Promise.all(mediaToAddToPost.map(row => {
          return db.MediaPosts.create({
            PostId: data.id,
            MediumId: row.MediumId,
            loadSequence: row.loadSequence,
            caption: row.caption
          })
        }))
        await Promise.all(mediaToUpdate.map(async row => {
          let foundMediaPostRow = await db.MediaPosts.find({where: {
            PostId: data.id,
            MediumId: row.MediumId
          }})
          return foundMediaPostRow.update({
            loadSequence: row.loadSequence,
            caption: row.caption
          })
        }))
      }

      let foundPost = await db.Post.findById(data.id)
      let updatedPost = await foundPost.update(updatesObj)

      console.log('updatedPost', updatedPost)
      return updatedPost
    },
    updateMultiplePosts: (__, data) => {
      // DO WE STILL NEED UPDATE MULTIPLE POSTS IF THERE ARE NO PARENT POSTS?
      // console.log('arr of input objs', data.input)
      // for each input obj, modify the post
      // let promiseArr = []
      // let inputArr = data.input
      // inputArr.forEach(obj => {
      //   console.log('input obj', obj)
      //   let updatesObj = {}
      //   // check fields
      //   let fields = ['ParentPostId', 'loadSequence', 'title', 'textContent', 'description', 'startDay', 'endDay', 'eventType', 'contentOnly', 'start']
      //
      //   // Object.hasOwnProperty doesn't work with input obj. reference: graphql-js Object.create(null)
      //   fields.forEach(field => {
      //     if (field in obj) {
      //       updatesObj[field] = obj[field]
      //     }
      //   })
      //   // if ('contentOnly' in obj) {
      //   //   updatesObj.contentOnly = obj.contentOnly
      //   // }
      //   // if ('start' in obj) {
      //   //   updatesObj.start = obj.start
      //   // }
      //   // find Post, then update
      //   let updatePromise = db.Post.findById(obj.id)
      //     .then(foundPost => {
      //       return foundPost.update(updatesObj)
      //     })
      //   promiseArr.push(updatePromise)
      // })
      // return Promise.all(promiseArr)
      //   .then(values => {
      //     console.log('values', values)
      //     return true
      //   })
      //   .catch(err => {
      //     console.log('err', err)
      //     return false
      //   })
    },
    deletePost: async (__, data) => {
      /*
      (X) delete media-posts join table rows
      (X) delete hashtags-posts join table rows
      (X) delete post itself
      */
      let foundPost = await db.Post.findById(data.id)

      await db.MediaPosts.destroy({where: {PostId: foundPost.id}})
      await db.HashtagsPosts.destroy({where: {PostId: foundPost.id}})

      return foundPost.destroy()
    }
  }
}

module.exports = Post
