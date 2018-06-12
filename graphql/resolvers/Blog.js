const db = require('../connectors')
const _ = require('lodash')
const moment = require('moment')
const findOrCreateHashtag = require('./helpers/findOrCreateHashtag')

const Blog = {
  Blog: {
    posts (blog) {
      return blog.getPosts()
    },
    hashtags (blog) {
      return blog.getHashtags()
    },
    headings (blog) {
      return blog.getBlogHeadings()
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
    // allBlogs: () => {
    //   return db.Blog.findAll()
    // },
    getAllPublishedBlogs: () => {
      return db.Blog.findAll({where: {published: true}})
        .then(foundBlogs => {
          // console.log('foundBlogs', foundBlogs)
          // sort by publishDate. most recent is first, older post is last.
          let sortedArray = foundBlogs.sort((a, b) => {
            return moment(a.publishDate).isBefore(moment(b.publishDate))
          })
          // console.log('sorted', sortedArray)
          // return foundBlogs
          return sortedArray
        })
    },
    getUserBlogs: (__, data, context) => {
      // use context to find all blogs belonging to logged in user
      return db.Blog.findAll({
        where: {UserId: context.user}
      })
        .then(foundBlogs => {
          // console.log('GET USER BLOGS', foundBlogs)
          // sort by most recent?
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
      // return db.Blog.create({
      //   UserId: data.UserId,
      //   published: false,
      //   title: data.title,
      //   textContent: data.textContent,
      //   shares: 0,
      //   views: 0
      // })
      //   .then(created => {
      //     console.log('created', created)
      //   })
    },
    updateBlog: (__, data) => {
      // console.log('data', data)
      // var updatesObj = {}
      // var fields = ['title', 'textContent', 'published', 'ItineraryId', 'days']
      // fields.forEach(field => {
      //   if (field in data) {
      //     updatesObj[field] = data[field]
      //   }
      // })
      // // console.log('updatesObj', updatesObj)
      //
      // // check hashtags arr against HashtagsBlogs. remove if not in arr, add if new
      // let incomingHashtags = data.hashtags
      // let currentHashtags = db.HashtagsBlogs.findAll({where: {BlogId: data.id}})
      //   .then(joinTableArr => {
      //     let hashtagArr = []
      //     joinTableArr.forEach(row => {
      //       let string = db.Hashtag.findById(row.HashtagId)
      //         .then(foundHashtag => {
      //           return foundHashtag.name
      //         })
      //       hashtagArr.push(string)
      //     })
      //     return Promise.all(hashtagArr)
      //   })
      //
      // let incomingMediaArr = data.media
      // let currentMediaArr = db.MediaBlogs.findAll({where: {BlogId: data.id}})
      //   .then(joinTableRows => {
      //     // extract actual arr of objs out from sequelize obj
      //     let scrubbedArr = joinTableRows.map(e => {
      //       return e.dataValues
      //     })
      //     return scrubbedArr
      //   })
      //
      // return currentHashtags
      //   .then(currentHashtags => {
      //     if (incomingHashtags) {
      //       // compare incoming hashtags arr with preexisting hashtags
      //       let hashtagPromiseArr = []
      //
      //       let hashtagsToRemoveFromBlog = _.difference(currentHashtags, incomingHashtags)
      //       // console.log('to remove', hashtagsToRemoveFromBlog)
      //       hashtagsToRemoveFromBlog.forEach(string => {
      //         let deletePromise = db.Hashtag.find({where: {name: string}})
      //           .then(found => {
      //             return db.HashtagsBlogs.destroy({where: {
      //               BlogId: data.id,
      //               HashtagId: found.id
      //             }})
      //           })
      //         hashtagPromiseArr.push(deletePromise)
      //       })
      //       // if hashtag is in incoming but not in current, create new hashtag / jointable row
      //       let hashtagsToAddToBlog = _.difference(incomingHashtags, currentHashtags)
      //       // console.log('hashtags to add', hashtagsToAddToBlog)
      //       hashtagsToAddToBlog.forEach(string => {
      //         let createPromise = findOrCreateHashtag(string)
      //           .then(id => {
      //             return db.HashtagsBlogs.create({
      //               BlogId: data.id,
      //               HashtagId: id
      //             })
      //           })
      //         hashtagPromiseArr.push(createPromise)
      //       })
      //       return Promise.all(hashtagPromiseArr)
      //     } else {
      //       return Promise.resolve(true)
      //     }
      //   })
      //   .then(() => {
      //     // compare MediaBlogs to see what is deleted, added, updated
      //     currentMediaArr
      //       .then(currentMediaArr => {
      //         if (incomingMediaArr) {
      //           let mediaBlogPromiseArr = []
      //           /*
      //           ( ) find MediaBlogs to delete. MediumId in current, but not in incoming
      //           ( ) find MediaBlogs to add. MediumId in incoming, but not in present
      //           ( ) update MediaBlogs for those present in both arrays. find intersect by MediumId
      //           use loose equals. id might be int or numeric string
      //           */
      //           let mediaToRemoveFromBlog = _.differenceWith(currentMediaArr, incomingMediaArr, function (arrVal, otherVal) {
      //             return arrVal.MediumId == otherVal.MediumId
      //           })
      //           // console.log('mediaToRemoveFromBlog', mediaToRemoveFromBlog)
      //
      //           let mediaToAddToBlog = _.differenceWith(incomingMediaArr, currentMediaArr, function (arrVal, otherVal) {
      //             return arrVal.MediumId == otherVal.MediumId
      //           })
      //           // console.log('mediaToAddToBlog', mediaToAddToBlog)
      //
      //           // media to update are the objs in the incoming arr which match the MediumId of currentArr.
      //           let mediaToUpdate = _.intersectionWith(incomingMediaArr, currentMediaArr, function (arrVal, otherVal) {
      //             return arrVal.MediumId == otherVal.MediumId
      //           })
      //           // console.log('mediaToUpdate', mediaToUpdate)
      //
      //           mediaToRemoveFromBlog.forEach(row => {
      //             let removePromise = db.MediaBlogs.destroy({where: {
      //               BlogId: data.id,
      //               MediumId: row.MediumId
      //             }})
      //             mediaBlogPromiseArr.push(removePromise)
      //           })
      //           mediaToAddToBlog.forEach(row => {
      //             let addPromise = db.MediaBlogs.create({
      //               BlogId: data.id,
      //               MediumId: row.MediumId,
      //               loadSequence: row.loadSequence,
      //               caption: row.caption
      //             })
      //             mediaBlogPromiseArr.push(addPromise)
      //           })
      //           mediaToUpdate.forEach(row => {
      //             let updatePromise = db.MediaBlogs.find({where: {MediumId: row.MediumId, BlogId: data.id}})
      //               .then(found => {
      //                 return found.update({
      //                   loadSequence: row.loadSequence,
      //                   caption: row.caption
      //                 })
      //               })
      //             mediaBlogPromiseArr.push(updatePromise)
      //           })
      //
      //           return Promise.all(mediaBlogPromiseArr)
      //             .then(values => {
      //               console.log('values', values)
      //               return true
      //             })
      //         } else {
      //           // if media arr not passed
      //           return Promise.resolve(true)
      //         }
      //       })
      //   })
      //   .then(() => {
      //     // update Blog itself
      //     return db.Blog.findById(data.id)
      //       .then(foundBlog => {
      //         return foundBlog.update(updatesObj)
      //           .then(updated => {
      //             console.log('updated', updated)
      //             return updated
      //           })
      //       })
      //   })
    },
    deleteBlog: (__, data) => {
      // DELETE EVERYTHING TO DO WITH BLOG
      /*
      perhaps write a beforeDestroy hook.
      (X) delete all MediaBlogs
      (X) delete all HashtagsBlogs
      (X) delete all BlogHeadings
      (X) delete all MediaPosts
      (X) delete all HashtagsPosts
      (X) delete all ChildPosts
      (X) delete all ParentPosts
      (X) delete all blogslikesusers
      (X) then deleteBlog
      */

      // var BlogId = data.id
      // return db.Blog.findById(BlogId)
      //   .then(() => {
      //     return db.MediaBlogs.destroy({where: {BlogId: BlogId}})
      //   })
      //   .then(() => {
      //     return db.HashtagsBlogs.destroy({where: {BlogId: BlogId}})
      //   })
      //   .then(() => {
      //     return db.BlogHeading.destroy({where: {BlogId: BlogId}})
      //   })
      //   .then(() => {
      //     return db.Post.findAll({where: {BlogId: BlogId}})
      //       .then(foundPosts => {
      //         // console.log('foundPosts. both parent/child', foundPosts)
      //         // remove all mediaPosts join table rows
      //         var deleteMediaPromiseArr = []
      //         foundPosts.forEach(post => {
      //           var PostId = post.id
      //           var deleteMediaPromise = db.MediaPosts.destroy({where: {PostId: PostId}})
      //
      //           deleteMediaPromiseArr.push(deleteMediaPromise)
      //         })
      //         return Promise.all(deleteMediaPromiseArr)
      //           .then(() => {
      //             return foundPosts
      //           })
      //       })
      //       .then(foundPosts => {
      //         let deleteHashtagsPromiseArr = []
      //         foundPosts.forEach(post => {
      //           let PostId = post.id
      //           let deleteHashtagPostPromise = db.HashtagsPosts.destroy({where: {PostId: PostId}})
      //           deleteHashtagsPromiseArr.push(deleteHashtagPostPromise)
      //         })
      //         return Promise.all(deleteHashtagsPromiseArr)
      //           .then(() => {
      //             return foundPosts
      //           })
      //       })
      //       .then(foundPosts => {
      //         // delete childPosts first
      //         var childPosts = foundPosts.filter(post => {
      //           return post.ParentPostId
      //         })
      //         // console.log('childPosts', childPosts)
      //
      //         var deleteChildPostsPromiseArr = []
      //
      //         childPosts.forEach(post => {
      //           var deletePromise = db.Post.destroy({where: {id: post.id}})
      //           deleteChildPostsPromiseArr.push(deletePromise)
      //         })
      //
      //         return Promise.all(deleteChildPostsPromiseArr)
      //       })
      //       .then(() => {
      //         // delete all remaining parent posts
      //         return db.Post.destroy({where: {BlogId: BlogId}})
      //       })
      //       .then(() => {
      //         return db.BlogLikesUsers.destroy({where: {BlogId: BlogId}})
      //       })
      //       .then(() => {
      //         return db.Blog.destroy({where: {id: BlogId}})
      //       })
      //   })
    }
  }
}

module.exports = Blog
