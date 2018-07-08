const db = require('../connectors')
const _ = require('lodash')
const moment = require('moment')
const findOrCreateHashtag = require('./helpers/findOrCreateHashtag')

const Blog = {
  Blog: {
    hashtags (blog) {
      return blog.getHashtags()
    },
    user (blog) {
      return blog.getUser()
    },
    likes (blog) {
      return blog.getLikes()
    },
    async pages (blog) {
      const blogId = blog.id
      const models = ['BlogHeading', 'Post']

      let combinedRows = await Promise.all(models.map(async model => {
        // each model (blog or header) needs to return an arr of row promises
        // so [[blog rows], [header rows]]
        let arrModel = await db[model].findAll({where: {BlogId: blogId}})
          .then(foundRows => {
            return foundRows.map(e => {
              const obj = {
                type: model,
                modelId: e.id,
                loadSequence: e.loadSequence,
                [model]: e
              }
              return Promise.resolve(obj)
            })
          })

        return arrModel
      }))

      let events = combinedRows.reduce(function (a, b) {
        return a.concat(b)
      })
      return events.sort(function (a, b) {
        return a.loadSequence - b.loadSequence
      })
    },
    medium (blog) {
      return blog.getMedium()
    },
    // PUBLISHDATE RETURNED BY GRAPHQL SCHEMA IS A MOMENT MODIFIED STRING EG(11TH APRIL 2018). PUBLISHDATE SAVED IN DB IS STILL JS DATE
    publishDate (blog) {
      // calculate date string based on updatedAt date
      // console.log('updatedAt', blog.updatedAt)
      // console.log('publishDate', blog.publishDate)
      // console.log('moment', moment(blog.publishDate))
      let formatted = moment(blog.publishDate).format('Do MMM YYYY')
      // let momentDate = moment(blog.updatedAt)
      // temp use createdAt for publishDate. using updatedAt will change everytime view changes
      // let momentDate = moment(blog.createdAt)
      // let formatted = momentDate.format('Do MMM YYYY')
      // console.log('formatted', formatted)
      return formatted
    },
    timeFromPublishDate (blog) {
      // calculate (eg. 2 hrs ago) using moment
      let momentPublishDate = moment(blog.publishDate)
      let timeElapsed = momentPublishDate.fromNow()
      // console.log('timeElapsed', timeElapsed)
      return timeElapsed
    }
  },
  Query: {
    getAllPublishedBlogs: async () => {
      let foundBlogs = await db.Blog.findAll({where: {published: true}})

      return foundBlogs.sort((a, b) => {
        return moment(a.publishDate).isBefore(moment(b.publishDate))
      })
    },
    getUserBlogs: async (__, data, context) => {
      // use context to find all blogs belonging to logged in user
      let foundBlogs = await db.Blog.findAll({where: {UserId: context.user}})
      return foundBlogs.sort((a, b) => {
        return moment(a.publishDate).isBefore(moment(b.publishDate))
      })
    },
    findBlog: (__, data) => {
      return db.Blog.findById(data.id)
    }
  },
  Mutation: {
    increaseBlogViews: async (__, data) => {
      let blog = await db.Blog.findById(data.id)
      return blog.increment('views', {by: 1})
    },
    toggleBlogLikes: async (__, data) => {
      // if row doesnt exist, add join table row. else remove
      let joinTableRow = await db.BlogLikesUsers.findOne({where: {
        BlogId: data.BlogId,
        UserId: data.UserId
      }})

      if (joinTableRow) {
        return joinTableRow.destroy()
      } else {
        return db.BlogLikesUsers.create({
          BlogId: data.BlogId,
          UserId: data.UserId
        })
          .then(created => {
            return true
          })
      }
    },
    createBlog: async (__, data) => {
      // blog cover page is created empty at first
      let createdBlog = await db.Blog.create({
        UserId: data.UserId,
        published: false,
        title: data.title || 'Blog title',
        shares: 0,
        views: 0
      })
      console.log('createdBlog', createdBlog)
      return createdBlog
    },
    updateBlog: async (__, data) => {
      /*
      (X) compare hashtags arr and add/remove
      (X) title, days, published boolean, MediumId
      (X) set publish date if published for first time
      */
      // console.log('data', data)
      let updatesObj = {}
      let fields = ['title', 'days', 'published', 'MediumId']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      // console.log('updatesObj', updatesObj)

      let incomingHashtags = data.hashtags
      let currentHashtags = await db.HashtagsBlogs.findAll({where: {
        BlogId: data.id
      }})
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

      let hashtagsToRemoveFromBlog = _.difference(currentHashtags, incomingHashtags)
      let hashtagsToAddToBlog = _.difference(incomingHashtags, currentHashtags)
      await hashtagsToRemoveFromBlog.map(async string => {
        let foundHashtag = await db.Hashtag.find({where: {name: string}})
        return db.HashtagsBlogs.destroy({where: {
          BlogId: data.id,
          HashtagId: foundHashtag
        }})
      })
      await hashtagsToAddToBlog.map(async string => {
        let createdHashtagId = await findOrCreateHashtag(string)
        return db.HashtagsBlogs.create({
          BlogId: data.id,
          HashtagId: createdHashtagId
        })
      })

      let foundBlog = await db.Blog.findById(data.id)
      if (!foundBlog.publishDate && data.published) {
        updatesObj.publishDate = new Date()
      }

      let updatedBlog = await foundBlog.update(updatesObj)

      // console.log('updatedBlog', updatedBlog)
      return updatedBlog
    },
    deleteBlog: async (__, data) => {
      /*
        (X) delete HashtagsBlogs
        (X) delete BlogHeading
        (X) delete mediaPosts
        (X) deleteHashtagPosts
        (X) delete Posts
        (X) delete BlogLikesUsers
        (X) delete Blog
      */
      let BlogId = data.id

      await db.HashtagsBlogs.destroy({where: {BlogId: BlogId}})
      await db.BlogHeading.destroy({where: {BlogId: BlogId}})

      let postsArr = await db.Post.findAll({where: {BlogId: BlogId}})
      await Promise.all(postsArr.map(async post => {
        await db.MediaPosts.destroy({where: {PostId: post.id}})
        await db.HashtagsPosts.destroy({where: {PostId: post.id}})
        return post.destroy()
      }))

      await db.BlogLikesUsers.destroy({where: {BlogId: BlogId}})

      return db.Blog.destroy({where: {id: BlogId}})
    }
  }
}

module.exports = Blog
