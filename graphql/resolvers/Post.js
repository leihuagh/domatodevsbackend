const db = require('../connectors')
const findOrCreateLocation = require('./helpers/findOrCreateLocation')

const Post = {
  Post: {
    blog (post) {
      return post.getBlog()
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
      var fields = ['ParentPostId', 'loadSequence', 'title', 'textContent', 'description', 'eventType', 'startDay', 'endDay', 'start', 'contentOnly']

      // if key is passed, update value. might be empty string (delete field)
      fields.forEach(field => {
        if (field in data) {
          temp[field] = data[field]
        }
      })
      // also check contentOnly, start boolean properties. falsy is also an update value
      // if (data.hasOwnProperty('start')) {
      //   temp.start = data.start
      // }
      // if (data.hasOwnProperty('contentOnly')) {
      //   temp.contentOnly = data.contentOnly
      // }

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

      return updatesObj
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
          // might not have children
          return foundPost.getChildPosts()
            .then(arr => {
              console.log('arr', arr)

              var deleteChildPostPromiseArr = []
              arr.forEach(childPost => {
                var deleteChildPostPromise = db.MediaPosts.destroy({where: {PostId: childPost.id}})
                  .then(() => {
                    db.Post.destroy({where: {id: childPost.id}})
                  })
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
