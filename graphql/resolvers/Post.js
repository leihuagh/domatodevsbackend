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
    }
  },
  Query: {
    findPost: (__, data) => {
      return db.Post.findById(data.id)
    }
  }
}

module.exports = Post
