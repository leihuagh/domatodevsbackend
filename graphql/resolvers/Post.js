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
        // each row e
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
      var temp = {}
      var fields = ['loadSequence', 'title', 'textContent', 'eventType', 'bucketCategory', 'startDay', 'startTime', 'endTime']
      fields.forEach(field => {
        if (field in data) {
          temp[field] = data[field]
        }
      })

      // find or create LocationId if data.locationData exists
      // what if LocationId was passed directly?
      let updatesObj
      if (data.locationData) {
        updatesObj = findOrCreateLocation(data.locationData)
          .then(LocationId => {
            temp.LocationId = LocationId
            return temp
          })
      } else if (('LocationId' in data) && !data.LocationId) {
        // IF LOCATIONID PROPERTY IS PASSED WITH NULL VALUE DELETE LOCATIONID
        temp.LocationId = null
        updatesObj = Promise.resolve(temp)
      } else {
        updatesObj = Promise.resolve(temp)
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

      //check media
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

      // HASHTAGS ARR AND MEDIA ARR MIGHT NOT BE PASSED. IF PROPERTY NOT IN DATA, SKIP THE PROMISE.
      // let incomingHashtags = data.hashtags
      // // currentHashtags is [name: String]
      // let currentHashtags = db.HashtagsPosts.findAll({where: {PostId: data.id}})
      //   .then(joinTableArr => {
      //     let hashtagArr = []
      //     joinTableArr.forEach(row => {
      //       let string = db.Hashtag.findById(row.HashtagId)
      //         .then(foundHashtag => {
      //           return foundHashtag.name
      //         })
      //       hashtagArr.push(string)
      //     })
      //     return Promise.all(hashtagArr)
      //   })
      //
      // let incomingMediaArr = data.media
      // console.log('incomingMediaArr', incomingMediaArr)
      // let currentMediaArr = db.MediaPosts.findAll({where: {PostId: data.id}})
      //   .then(joinTableRows => {
      //     // need to extract out the arr of objects from sequelize obj arr
      //     let scrubbedArr = joinTableRows.map(e => {
      //       return e.dataValues
      //     })
      //     return scrubbedArr
      //   })
      //
      // return currentHashtags
      //   .then(currentHashtags => {
      //     // check if incomingHashtags property exists
      //     if (incomingHashtags) {
      //       let hashtagPromiseArr = []
      //       let hashtagsToRemoveFromPost = _.difference(currentHashtags, incomingHashtags)
      //       let hashtagsToAddToPost = _.difference(incomingHashtags, currentHashtags)
      //
      //       hashtagsToRemoveFromPost.forEach(string => {
      //         let deletePromise = db.Hashtag.find({where: {name: string}})
      //           .then(found => {
      //             return db.HashtagsPosts.destroy({where: {
      //               PostId: data.id,
      //               HashtagId: found.id
      //             }})
      //           })
      //         hashtagPromiseArr.push(deletePromise)
      //       })
      //
      //       hashtagsToAddToPost.forEach(string => {
      //         let createPromise = findOrCreateHashtag(string)
      //           .then(id => {
      //             console.log('returning id from helper', id)
      //             return db.HashtagsPosts.create({
      //               PostId: data.id,
      //               HashtagId: id
      //             })
      //           })
      //         hashtagPromiseArr.push(createPromise)
      //       })
      //
      //       return Promise.all(hashtagPromiseArr)
      //     } else {
      //       // if hashtags arr was not passed
      //       return Promise.resolve(true)
      //     }
      //   })
      //   .then(() => {
      //     currentMediaArr
      //       .then(currentMediaArr => {
      //         // incoming media arr is optional
      //         if (incomingMediaArr) {
      //           let mediaPostPromiseArr = []
      //           /*
      //           ( ) find mediaposts to delete. MediumId in current, but not in incoming
      //           ( ) find mediaposts to add. MediumId in incoming, but not in present
      //           ( ) update mediaPosts for those present in both arrays. find intersect by MediumId
      //           */
      //           // use loose equals. sequelize MediumId is int, but apollo may pass type ID as int, or numeric string
      //           let mediaToRemoveFromPost = _.differenceWith(currentMediaArr, incomingMediaArr, function (arrVal, otherVal) {
      //             return arrVal.MediumId == otherVal.MediumId
      //           })
      //           console.log('mediaToRemoveFromPost', mediaToRemoveFromPost)
      //
      //           let mediaToAddToPost = _.differenceWith(incomingMediaArr, currentMediaArr, function (arrVal, otherVal) {
      //             return arrVal.MediumId == otherVal.MediumId
      //           })
      //           console.log('mediaToAddToPost', mediaToAddToPost)
      //
      //           // media to update are the objs in the incoming arr which match the MediumId of currentArr.
      //           let mediaToUpdate = _.intersectionWith(incomingMediaArr, currentMediaArr, function (arrVal, otherVal) {
      //             return arrVal.MediumId == otherVal.MediumId
      //           })
      //           console.log('mediaToUpdate', mediaToUpdate)
      //
      //           mediaToRemoveFromPost.forEach(row => {
      //             let removePromise = db.MediaPosts.destroy({where: {
      //               PostId: data.id,
      //               MediumId: row.MediumId
      //             }})
      //             mediaPostPromiseArr.push(removePromise)
      //           })
      //           mediaToAddToPost.forEach(row => {
      //             let addPromise = db.MediaPosts.create({
      //               PostId: data.id,
      //               MediumId: row.MediumId,
      //               loadSequence: row.loadSequence,
      //               caption: row.caption
      //             })
      //             mediaPostPromiseArr.push(addPromise)
      //           })
      //           mediaToUpdate.forEach(row => {
      //             let updatePromise = db.MediaPosts.find({where: {MediumId: row.MediumId, PostId: data.id}})
      //               .then(found => {
      //                 return found.update({
      //                   loadSequence: row.loadSequence,
      //                   caption: row.caption
      //                 })
      //               })
      //             mediaPostPromiseArr.push(updatePromise)
      //           })
      //           return Promise.all(mediaPostPromiseArr)
      //         } else {
      //           // if data.media undef (not passed)
      //           return Promise.resolve(true)
      //         }
      //       })
      //   })
      //   .then(() => {
      //     return updatesObj
      //   })
      //   .then(updatesObj => {
      //     return db.Post.findById(data.id)
      //       .then(foundPost => {
      //         return foundPost.update(updatesObj)
      //           .then(updated => {
      //             console.log('updated', updated)
      //             return updated
      //           })
      //       })
      //   })
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
      // should write beforeDestroy hook.
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
