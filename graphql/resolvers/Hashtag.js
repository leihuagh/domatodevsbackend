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
    createHashtagBlog: async (__, data) => {
      // console.log('data received', data)
      let HashtagId = await findOrCreateHashtag(data.name)
      return db.HashtagsBlogs.create({
        BlogId: data.BlogId,
        HashtagId: HashtagId
      })
    },
    deleteHashtagBlog: (__, data) => {
      // delete join table only
      return db.HashtagsBlogs.destroy({where: {id: data.id}})
    },
    createHashtagPost: async (__, data) => {
      // console.log('data received', data)
      let HashtagId = await findOrCreateHashtag(data.name)
      return db.HashtagsPosts.create({
        PostId: data.PostId,
        HashtagId: HashtagId
      })
    },
    deleteHashtagPost: (__, data) => {
      // delete join table only
      return db.HashtagsPosts.destroy({where: {id: data.id}})
    }
  }
}

module.exports = Hashtag
