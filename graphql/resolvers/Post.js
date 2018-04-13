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
    childPosts (post) {
      return post.getChildPosts()
    },
    location (post) {
      return post.getLocation()
    },
    media (post) {
      const postId = post.id
      return db.MediaPosts.findAll({where: {PostId: postId}})
        .then(foundRows => {
          let arr = []
          foundRows.forEach(e => {
            let obj = {
              loadSequence: e.loadSequence,
              caption: e.caption,
              id: e.MediumId
            }
            arr.push(obj)
          })
          return Promise.all(arr)
        })
        .then(results => {
          let arr = []
          results.forEach(e => {
            const innerPromise = db.Medium.findById(e.id)
              .then(medium => {
                const obj = {...e,
                  ...{
                    type: medium.type,
                    imageUrl: medium.imageUrl,
                    youtubeUrl: medium.youtubeUrl
                  }
                }
                return obj
              })
            arr.push(innerPromise)
          })
          return Promise.all(arr)
        })
        .then(values => {
          var media = values.reduce(function (a, b) {
            return a.concat(b)
          }, [])
          var sorted = media.sort(function (a, b) {
            return a.loadSequence - b.loadSequence
          })
          return sorted
        })
    }
  },
  Query: {
    findPost: (__, data) => {
      return db.Post.findById(data.id)
    }
  },
  Mutation: {
    createPost: (__, data) => {
      // console.log('data', data)
      return db.Post.create({
        BlogId: data.BlogId,
        ParentPostId: data.ParentPostId,
        loadSequence: data.loadSequence,
        title: data.title || 'Default title',
        contentOnly: true
      })
        .then(created => {
          console.log('createdPost', created)
          return created
        })
    },
    updatePost: (__, data) => {
      // console.log('data', data)
      var temp = {}
      var fields = ['ParentPostId', 'loadSequence', 'title', 'textContent', 'description', 'eventType', 'startDay', 'endDay', 'startTime', 'endTime', 'start', 'contentOnly']

      // if key is passed, update value. might be empty string (delete field)
      fields.forEach(field => {
        if (field in data) {
          temp[field] = data[field]
        }
      })

      // find or create LocationId if data.googlePlaceData exists
      let updatesObj
      if (data.googlePlaceData) {
        updatesObj = findOrCreateLocation(data.googlePlaceData)
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

      let incomingHashtags = data.hashtags
      // currentHashtags is [name: String]
      let currentHashtags = db.HashtagsPosts.findAll({where: {PostId: data.id}})
        .then(joinTableArr => {
          let hashtagArr = []
          joinTableArr.forEach(row => {
            let string = db.Hashtag.findById(row.HashtagId)
              .then(foundHashtag => {
                return foundHashtag.name
              })
            hashtagArr.push(string)
          })
          return Promise.all(hashtagArr)
        })

      let incomingMediaArr = data.media
      console.log('incomingMediaArr', incomingMediaArr)
      let currentMediaArr = db.MediaPosts.findAll({where: {PostId: data.id}})
        .then(joinTableRows => {
          // need to extract out the arr of objects from sequelize obj arr
          let scrubbedArr = joinTableRows.map(e => {
            return e.dataValues
          })
          return scrubbedArr
        })

      return currentHashtags
        .then(currentHashtags => {
          // compare incoming hashtags arr with preexisting hashtags
          let hashtagPromiseArr = []

          let hashtagsToRemoveFromPost = _.difference(currentHashtags, incomingHashtags)

          hashtagsToRemoveFromPost.forEach(string => {
            let deletePromise = db.Hashtag.find({where: {name: string}})
              .then(found => {
                return db.HashtagsPosts.destroy({where: {
                  PostId: data.id,
                  HashtagId: found.id
                }})
              })
            hashtagPromiseArr.push(deletePromise)
          })

          let hashtagsToAddToPost = _.difference(incomingHashtags, currentHashtags)

          hashtagsToAddToPost.forEach(string => {
            let createPromise = findOrCreateHashtag(string)
              .then(id => {
                console.log('returning id from helper', id)
                return db.HashtagsPosts.create({
                  PostId: data.id,
                  HashtagId: id
                })
              })
            hashtagPromiseArr.push(createPromise)
          })

          return Promise.all(hashtagPromiseArr)
        })
        .then(() => {
          currentMediaArr
            .then(currentMediaArr => {
              // console.log('currentMediaArr', currentMediaArr)
              let mediaPostPromiseArr = []
              /*
              ( ) find mediaposts to delete. MediumId in current, but not in incoming
              ( ) find mediaposts to add. MediumId in incoming, but not in present
              ( ) update mediaPosts for those present in both arrays. find intersect by MediumId
              */
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

              mediaToRemoveFromPost.forEach(row => {
                let removePromise = db.MediaPosts.destroy({where: {
                  PostId: data.id,
                  MediumId: row.MediumId
                }})
                mediaPostPromiseArr.push(removePromise)
              })
              mediaToAddToPost.forEach(row => {
                let addPromise = db.MediaPosts.create({
                  PostId: data.id,
                  MediumId: row.MediumId,
                  loadSequence: row.loadSequence,
                  caption: row.caption
                })
                mediaPostPromiseArr.push(addPromise)
              })
              mediaToUpdate.forEach(row => {
                let updatePromise = db.MediaPosts.find({where: {MediumId: row.MediumId}})
                  .then(found => {
                    return found.update({
                      loadSequence: row.loadSequence,
                      caption: row.caption
                    })
                  })
                mediaPostPromiseArr.push(updatePromise)
              })

              return Promise.all(mediaPostPromiseArr)
                .then(values => {
                  // console.log('values', values)
                  return true
                })
            })
        })
        .then(() => {
          return updatesObj
        })
        .then(updatesObj => {
          return db.Post.findById(data.id)
            .then(foundPost => {
              return foundPost.update(updatesObj)
                .then(updated => {
                  console.log('updated', updated)
                  return updated
                })
            })
        })
    },
    updateMultiplePosts: (__, data) => {
      // console.log('arr of input objs', data.input)
      // for each input obj, modify the post
      let promiseArr = []
      let inputArr = data.input
      inputArr.forEach(obj => {
        console.log('input obj', obj)
        let updatesObj = {}
        // check fields
        let fields = ['ParentPostId', 'loadSequence', 'title', 'textContent', 'description', 'startDay', 'endDay', 'eventType', 'contentOnly', 'start']

        // Object.hasOwnProperty doesn't work with input obj. reference: graphql-js Object.create(null)
        fields.forEach(field => {
          if (field in obj) {
            updatesObj[field] = obj[field]
          }
        })
        // if ('contentOnly' in obj) {
        //   updatesObj.contentOnly = obj.contentOnly
        // }
        // if ('start' in obj) {
        //   updatesObj.start = obj.start
        // }
        // find Post, then update
        let updatePromise = db.Post.findById(obj.id)
          .then(foundPost => {
            return foundPost.update(updatesObj)
          })
        promiseArr.push(updatePromise)
      })
      return Promise.all(promiseArr)
        .then(values => {
          console.log('values', values)
          return true
        })
        .catch(err => {
          console.log('err', err)
          return false
        })
    },
    deletePost: (__, data) => {
      // should write beforeDestroy hook.
      /*
      (X) delete parentPost-Media join table rows
      (X) delete parentPost-Hashtag join table rows
      (X) delete childPost-Media join table rows
      (X) delete childPost-Hashtag join table rows
      (X) delete childPosts
      (X) delete parent post
      */
      return db.Post.findById(data.id)
        .then(foundPost => {
          console.log('foundPost', foundPost)
          // delete all parent mediaPosts
          return db.MediaPosts.destroy({where: {PostId: foundPost.id}})
            .then(() => {
              return foundPost
            })
        })
        .then(foundPost => {
          return db.HashtagsPosts.destroy({where: {PostId: foundPost.id}})
            .then(() => {
              return foundPost
            })
        })
        .then(foundPost => {
          // might not have children
          return foundPost.getChildPosts()
            .then(arr => {
              console.log('arr', arr)

              var deleteChildPostPromiseArr = []
              arr.forEach(childPost => {

                // delete both childPostMedia and childPostHashtag first
                let deleteMediaPost = db.MediaPosts.destroy({where: {PostId: childPost.id}})
                let deleteHashtagPost = db.HashtagsPosts.destroy({where: {PostId: childPost.id}})

                let deleteChildPostPromise = Promise.all([deleteMediaPost, deleteHashtagPost])
                  .then(() => {
                    return db.Post.destroy({where: {id: childPost.id}})
                  })

                // var deleteChildPostPromise = db.MediaPosts.destroy({where: {PostId: childPost.id}})
                //   .then(() => {
                //     db.Post.destroy({where: {id: childPost.id}})
                //   })
                deleteChildPostPromiseArr.push(deleteChildPostPromise)
              })

              return Promise.all(deleteChildPostPromiseArr)
            })
        })
        .then(() => {
          // lastly actually delete the post
          return db.Post.destroy({where: {id: data.id}})
        })
    }
  }
}

module.exports = Post
