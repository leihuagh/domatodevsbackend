const db = require('../connectors')

// will either find or create hastag and return HashtagId
function findOrCreateHashtag (string) {
// no spaces or special chars allowed. restrict in input field
  // console.log('tag name', string)
  return db.Hashtag.findOrCreate({where: {name: string}})
    .spread(function (foundOrCreated, newRow) {
      console.log('found or created', foundOrCreated)
      console.log('is new row?', newRow)
      return foundOrCreated.id
    })
}

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
