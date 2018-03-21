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
    }
  },
  Query: {
    findPost: (__, data) => {
      return db.Post.findById(data.id)
    }
  }
}

module.exports = Post
