const db = require('../connectors')
const findOrCreateHashtag = require('./helpers/findOrCreateHashtag')

const Hashtag = {
  Hashtag: {
    taggedBlogs (hashtag) {
      return hashtag.getBlogs()
    },
    taggedPosts (hashtag) {
      return hashtag.getPosts()
    }
  },
  Query: {
    getAllHashtags: () => {
      return db.Hashtag.findAll()
    },
    findHashtag: (__, data) => {
      return db.Hashtag.findById(data.id)
    }
  },
  Mutation: {
    createHashtagBlog: (__, data) => {
      // console.log('data received', data)
      let HashtagId = findOrCreateHashtag(data.name)

      return HashtagId
        .then(id => {
          // console.log('id', id)
          return db.HashtagsBlogs.create({
            BlogId: data.BlogId,
            HashtagId: id
          })
        })
    },
    deleteHashtagBlog: (__, data) => {
      // delete join table only
      return db.HashtagsBlogs.destroy({where: {id: data.id}})
    },
    createHashtagPost: (__, data) => {
      // console.log('data received', data)
      let HashtagId = findOrCreateHashtag(data.name)

      return HashtagId
        .then(id => {
          // console.log('id', id)
          return db.HashtagsPosts.create({
            PostId: data.PostId,
            HashtagId: id
          })
        })
    },
    deleteHashtagPost: (__, data) => {
      // delete join table only
      return db.HashtagsPosts.destroy({where: {id: data.id}})
    }
  }
}

module.exports = Hashtag
