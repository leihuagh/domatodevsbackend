const db = require('../connectors')

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
                   url: medium.url,
                   type: medium.type
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
      var updatesObj = {}
      var fields = ['ParentPostId', 'LocationId', 'loadSequence', 'title', 'textContent', 'description', 'eventType', 'startDay', 'endDay']

      fields.forEach(field => {
        if (data[field]) {
          updatesObj[field] = data[field]
        }
      })
      // also check contentOnly, start boolean properties. falsy is also an update value
      if (data.hasOwnProperty('start')) {
        updatesObj.start = data.start
      }
      if (data.hasOwnProperty('contentOnly')) {
        updatesObj.contentOnly = data.contentOnly
      }

      return db.Post.findById(data.id)
        .then(foundPost => {
          return foundPost.update(updatesObj)
            .then(updatedPost => {
              console.log('updatedPost', updatedPost)
            })
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
