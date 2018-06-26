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
    pages (blog) {
      const blogId = blog.id
      const models = ['BlogHeading', 'Post']
      let pageModelPromises = []

      models.forEach(model => {
        let arrModel = []
        const pageModel =
        db[model].findAll({where: {BlogId: blogId}})
          .then(foundRows => {
            foundRows.forEach(e => {
              const obj = {
                type: model,
                modelId: e.id,
                loadSequence: e.loadSequence,
                [model]: e
              }
              console.log('BlogHeading or Post obj', obj)
              arrModel.push(obj)
            })
            return Promise.all(arrModel)
          })
        pageModelPromises.push(pageModel)
      })

      return Promise.all(pageModelPromises)
        .then(values => {
          var events = values.reduce(function (a, b) {
            return a.concat(b)
          }, [])
          var sorted = events.sort(function (a, b) {
            return a.loadSequence - b.loadSequence
          })
          return sorted
        })
    },
    // media (blog) {
    //   // REWRITE WITHOUT THE FOR EACH LOOP. MAKE MEDIAPOSTOBJECT
    //   let BlogId = blog.id
    //   let mediaBlogsJoinTableRows = db.MediaBlogs.findAll({where: {BlogId: BlogId}})
    //
    //   return mediaBlogsJoinTableRows
    //     .then(mediaBlogsJoinTableRows => {
    //       let constructedObjPromiseArr = []
    //
    //       mediaBlogsJoinTableRows.forEach(join => {
    //         let MediumId = join.MediumId
    //
    //         let constructedObjPromise = db.Medium.findById(MediumId)
    //           .then(foundMedium => {
    //             // console.log('join table row', join.dataValues)
    //             let mergedObj = {
    //               ...join.dataValues, // id, MediumId, BlogId, loadSeq,caption
    //               type: foundMedium.type,
    //               AlbumId: foundMedium.AlbumId,
    //               objectName: foundMedium.objectName,
    //               imageUrl: foundMedium.imageUrl,
    //               youtubeUrl: foundMedium.youtubeUrl
    //             }
    //             return mergedObj
    //           })
    //         constructedObjPromiseArr.push(constructedObjPromise)
    //       }) // close for each
    //
    //       return Promise.all(constructedObjPromiseArr)
    //         .then(values => {
    //           // console.log('returning promise.all', values)
    //           return values.sort(function (a, b) {
    //             return a.loadSequence - b.loadSequence
    //           })
    //         })
    //     })
    // },
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
    getAllPublishedBlogs: () => {
      return db.Blog.findAll({where: {published: true}})
        .then(foundBlogs => {
          // console.log('foundBlogs', foundBlogs)
          // sort by publishDate. most recent is first, older post is last.
          let sortedArray = foundBlogs.sort((a, b) => {
            return moment(a.publishDate).isBefore(moment(b.publishDate))
          })
          return sortedArray
        })
    },
    getUserBlogs: (__, data, context) => {
      // use context to find all blogs belonging to logged in user
      return db.Blog.findAll({
        where: {UserId: context.user}
      })
        .then(foundBlogs => {
          let sortedArray = foundBlogs.sort((a, b) => {
            return moment(a.publishDate).isBefore(moment(b.publishDate))
          })
          return sortedArray
        })
    },
    findBlog: (__, data) => {
      return db.Blog.findById(data.id)
    }
  },
  Mutation: {
    increaseBlogViews: (__, data) => {
      return db.Blog.findById(data.id)
        .then(found => {
          return found.increment('views', {by: 1})
        })
    },
    toggleBlogLikes: (__, data) => {
      // if row doesnt exist, add join table row. else remove
      return db.BlogLikesUsers.findOne({where: {BlogId: data.BlogId, UserId: data.UserId}})
        .then(found => {
          console.log('found', found)
          if (found) {
            return found.destroy() // will return true if success
          } else {
            return db.BlogLikesUsers.create({
              BlogId: data.BlogId,
              UserId: data.UserId
            })
              .then(created => {
                return true
              })
          }
        })
    },
    createBlog: (__, data) => {
      // blog cover page is created empty at first
      return db.Blog.create({
        UserId: data.UserId,
        published: false,
        title: data.title || 'Blog title',
        shares: 0,
        views: 0
      })
        .then(createdBlog => {
          console.log('createdBlog', createdBlog)
          return createdBlog
        })
    },
    updateBlog: (__, data) => {
      /*
      (X) compare hashtags arr and add/remove
      (X) title, days, published boolean, MediumId
      (X) set publish date if published for first time
      */
      console.log('data', data)
      let updatesObj = {}
      let fields = ['title', 'days', 'published', 'MediumId']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      console.log('updatesObj', updatesObj)

      let incomingHashtags = data.hashtags
      let currentHashtags = db.HashtagsBlogs.findAll({where: {
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

      return currentHashtags
        .then(currentHashtags => {
          if (incomingHashtags) {
            let hashtagPromiseArr = []

            let hashtagsToRemoveFromBlog = _.difference(currentHashtags, incomingHashtags)
            let hashtagsToAddToBlog = _.difference(incomingHashtags, currentHashtags)

            hashtagsToRemoveFromBlog.forEach(string => {
              let deletePromise = db.Hashtag.find({where: {name: string}})
                .then(found => {
                  return db.HashtagsBlogs.destroy({where: {
                    BlogId: data.id,
                    HashtagId: found.id
                  }})
                })
              hashtagPromiseArr.push(deletePromise)
            })
            hashtagsToAddToBlog.forEach(string => {
              let createPromise = findOrCreateHashtag(string)
                .then(id => {
                  return db.HashtagsBlogs.create({
                    BlogId: data.id,
                    HashtagId: id
                  })
                })
              hashtagPromiseArr.push(createPromise)
            })
            return Promise.all(hashtagPromiseArr)
          } else {
            return Promise.resolve(true)
          }
        })
        .then(() => {
          // update Blog itself
          return db.Blog.findById(data.id)
            .then(foundBlog => {
              if (!foundBlog.publishDate && data.published) {
                // set publish date if published for the first time
                updatesObj.publishDate = new Date()
              }
              return foundBlog.update(updatesObj)
                .then(updated => {
                  console.log('updated', updated)
                  return updated
                })
            })
        })
    },
    deleteBlog: (__, data) => {
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

      return db.HashtagsBlogs.destroy({where: {BlogId: BlogId}})
        .then(() => {
          return db.BlogHeading.destroy({where: {BlogId: BlogId}})
        })
        .then(() => {
          // delete post and its join tables
          return db.Post.findAll({where: {BlogId: BlogId}})
            .then(foundPosts => {
              let deletePostsPromiseArr = []
              foundPosts.forEach(post => {
                let deleteMediaPostsPromise = db.MediaPosts.destroy({where: {
                  PostId: post.id
                }})
                let deleteHashtagsPostsPromise = db.HashtagsPosts.destroy({where: {
                  PostId: post.id
                }})
                let deletePostPromise = Promise.all([deleteMediaPostsPromise, deleteHashtagsPostsPromise])
                  .then(() => {
                    return post.destroy()
                  })
                deletePostsPromiseArr.push(deletePostPromise)
              }) // close for each

              return Promise.all(deletePostsPromiseArr)
                .then(values => {
                  console.log('delete all posts and join tables', values)
                  return true
                })
            })
        })
        .then(() => {
          return db.BlogLikesUsers.destroy({where: {
            BlogId: BlogId
          }})
        })
        .then(() => {
          return db.Blog.destroy({where: {id: BlogId}})
        })
    }
  }
}

module.exports = Blog
