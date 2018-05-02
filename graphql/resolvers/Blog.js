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
    media (blog) {
      // REWRITE WITHOUT THE FOR EACH LOOP. MAKE MEDIAPOSTOBJECT
      let BlogId = blog.id
      let mediaBlogsJoinTableRows = db.MediaBlogs.findAll({where: {BlogId: BlogId}})

      return mediaBlogsJoinTableRows
        .then(mediaBlogsJoinTableRows => {
          let constructedObjPromiseArr = []

          mediaBlogsJoinTableRows.forEach(join => {
            let MediumId = join.MediumId

            let constructedObjPromise = db.Medium.findById(MediumId)
              .then(foundMedium => {
                // console.log('join table row', join.dataValues)
                let mergedObj = {
                  ...join.dataValues, // id, MediumId, BlogId, loadSeq,caption
                  type: foundMedium.type,
                  AlbumId: foundMedium.AlbumId,
                  objectName: foundMedium.objectName,
                  imageUrl: foundMedium.imageUrl,
                  youtubeUrl: foundMedium.youtubeUrl
                }
                return mergedObj
              })
            constructedObjPromiseArr.push(constructedObjPromise)
          }) // close for each

          return Promise.all(constructedObjPromiseArr)
            .then(values => {
              // console.log('returning promise.all', values)
              return values.sort(function (a, b) {
                return a.loadSequence - b.loadSequence
              })
            })
        })
    },
    publishDate (blog) {
      // calculate date string based on updatedAt date
      // console.log('updatedAt', blog.updatedAt)
      // let momentDate = moment(blog.updatedAt)
      // temp use createdAt for publishDate. using updatedAt will change everytime view changes
      let momentDate = moment(blog.createdAt)
      let formatted = momentDate.format('Do MMM YYYY')
      // console.log('formatted', formatted)
      return formatted
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
          // need to sort by most recent?
          return foundBlogs
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
      return db.Blog.create({
        UserId: data.UserId,
        published: false,
        title: data.title,
        textContent: data.textContent,
        shares: 0,
        views: 0
      })
        .then(created => {
          console.log('created', created)
        })
    },
    updateBlog: (__, data) => {
      // console.log('data', data)
      var updatesObj = {}
      var fields = ['title', 'textContent', 'published', 'ItineraryId', 'days']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      // console.log('updatesObj', updatesObj)

      // check hashtags arr against HashtagsBlogs. remove if not in arr, add if new
      let incomingHashtags = data.hashtags
      let currentHashtags = db.HashtagsBlogs.findAll({where: {BlogId: data.id}})
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

      let incomingMediaArr = data.media
      let currentMediaArr = db.MediaBlogs.findAll({where: {BlogId: data.id}})
        .then(joinTableRows => {
          // extract actual arr of objs out from sequelize obj
          let scrubbedArr = joinTableRows.map(e => {
            return e.dataValues
          })
          return scrubbedArr
        })

      return currentHashtags
        .then(currentHashtags => {
          if (incomingHashtags) {
            // compare incoming hashtags arr with preexisting hashtags
            let hashtagPromiseArr = []

            let hashtagsToRemoveFromBlog = _.difference(currentHashtags, incomingHashtags)
            // console.log('to remove', hashtagsToRemoveFromBlog)
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
            // if hashtag is in incoming but not in current, create new hashtag / jointable row
            let hashtagsToAddToBlog = _.difference(incomingHashtags, currentHashtags)
            // console.log('hashtags to add', hashtagsToAddToBlog)
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
          // compare MediaBlogs to see what is deleted, added, updated
          currentMediaArr
            .then(currentMediaArr => {
              if (incomingMediaArr) {
                let mediaBlogPromiseArr = []
                /*
                ( ) find MediaBlogs to delete. MediumId in current, but not in incoming
                ( ) find MediaBlogs to add. MediumId in incoming, but not in present
                ( ) update MediaBlogs for those present in both arrays. find intersect by MediumId
                use loose equals. id might be int or numeric string
                */
                let mediaToRemoveFromBlog = _.differenceWith(currentMediaArr, incomingMediaArr, function (arrVal, otherVal) {
                  return arrVal.MediumId == otherVal.MediumId
                })
                // console.log('mediaToRemoveFromBlog', mediaToRemoveFromBlog)

                let mediaToAddToBlog = _.differenceWith(incomingMediaArr, currentMediaArr, function (arrVal, otherVal) {
                  return arrVal.MediumId == otherVal.MediumId
                })
                // console.log('mediaToAddToBlog', mediaToAddToBlog)

                // media to update are the objs in the incoming arr which match the MediumId of currentArr.
                let mediaToUpdate = _.intersectionWith(incomingMediaArr, currentMediaArr, function (arrVal, otherVal) {
                  return arrVal.MediumId == otherVal.MediumId
                })
                // console.log('mediaToUpdate', mediaToUpdate)

                mediaToRemoveFromBlog.forEach(row => {
                  let removePromise = db.MediaBlogs.destroy({where: {
                    BlogId: data.id,
                    MediumId: row.MediumId
                  }})
                  mediaBlogPromiseArr.push(removePromise)
                })
                mediaToAddToBlog.forEach(row => {
                  let addPromise = db.MediaBlogs.create({
                    BlogId: data.id,
                    MediumId: row.MediumId,
                    loadSequence: row.loadSequence,
                    caption: row.caption
                  })
                  mediaBlogPromiseArr.push(addPromise)
                })
                mediaToUpdate.forEach(row => {
                  let updatePromise = db.MediaBlogs.find({where: {MediumId: row.MediumId, BlogId: data.id}})
                    .then(found => {
                      return found.update({
                        loadSequence: row.loadSequence,
                        caption: row.caption
                      })
                    })
                  mediaBlogPromiseArr.push(updatePromise)
                })

                return Promise.all(mediaBlogPromiseArr)
                  .then(values => {
                    console.log('values', values)
                    return true
                  })
              } else {
                // if media arr not passed
                return Promise.resolve(true)
              }
            })
        })
        .then(() => {
          // update Blog itself
          return db.Blog.findById(data.id)
            .then(foundBlog => {
              return foundBlog.update(updatesObj)
                .then(updated => {
                  console.log('updated', updated)
                  return updated
                })
            })
        })
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
      var BlogId = data.id
      return db.Blog.findById(BlogId)
        .then(() => {
          return db.MediaBlogs.destroy({where: {BlogId: BlogId}})
        })
        .then(() => {
          return db.HashtagsBlogs.destroy({where: {BlogId: BlogId}})
        })
        .then(() => {
          return db.BlogHeading.destroy({where: {BlogId: BlogId}})
        })
        .then(() => {
          return db.Post.findAll({where: {BlogId: BlogId}})
            .then(foundPosts => {
              // console.log('foundPosts. both parent/child', foundPosts)
              // remove all mediaPosts join table rows
              var deleteMediaPromiseArr = []
              foundPosts.forEach(post => {
                var PostId = post.id
                var deleteMediaPromise = db.MediaPosts.destroy({where: {PostId: PostId}})

                deleteMediaPromiseArr.push(deleteMediaPromise)
              })
              return Promise.all(deleteMediaPromiseArr)
                .then(() => {
                  return foundPosts
                })
            })
            .then(foundPosts => {
              let deleteHashtagsPromiseArr = []
              foundPosts.forEach(post => {
                let PostId = post.id
                let deleteHashtagPostPromise = db.HashtagsPosts.destroy({where: {PostId: PostId}})
                deleteHashtagsPromiseArr.push(deleteHashtagPostPromise)
              })
              return Promise.all(deleteHashtagsPromiseArr)
                .then(() => {
                  return foundPosts
                })
            })
            .then(foundPosts => {
              // delete childPosts first
              var childPosts = foundPosts.filter(post => {
                return post.ParentPostId
              })
              // console.log('childPosts', childPosts)

              var deleteChildPostsPromiseArr = []

              childPosts.forEach(post => {
                var deletePromise = db.Post.destroy({where: {id: post.id}})
                deleteChildPostsPromiseArr.push(deletePromise)
              })

              return Promise.all(deleteChildPostsPromiseArr)
            })
            .then(() => {
              // delete all remaining parent posts
              return db.Post.destroy({where: {BlogId: BlogId}})
            })
            .then(() => {
              return db.BlogLikesUsers.destroy({where: {BlogId: BlogId}})
            })
            .then(() => {
              return db.Blog.destroy({where: {id: BlogId}})
            })
        })
    }
  }
}

module.exports = Blog

/* CREATEBLOGWITHCONTENT. shelve for now.
createBlog: (__, data) => {
  // console.log('data received', data)
  var blogContentArr = data.blogContentArr
  var mediaContentArr = data.mediaContentArr

  var createdBlog = db.Blog.create({
    UserId: data.UserId,
    ItineraryId: data.ItineraryId,
    title: data.title,
    textContent: data.textContent
  })

  var createdBlogMediaJoinTables = createdBlog
    .then(createdBlog => {
      var BlogId = createdBlog.id

      // check if top lvl blog needs media-blog join table rows
      if (!mediaContentArr || !mediaContentArr.length) {
        return Promise.resolve(BlogId)
      } else {
        var blogMediaPromiseArr = []

        mediaContentArr.forEach(input => {
          // console.log('input', input)
          var blogMediaPromise = db.MediaBlogs.create({
            BlogId: BlogId,
            MediumId: input.MediumId,
            caption: input.caption,
            loadSequence: input.loadSequence
          })
          blogMediaPromiseArr.push(blogMediaPromise)
        }) // close for each

        return Promise.all(blogMediaPromiseArr)
          .then(values => {
            return BlogId
          })
      } // close if else
    })

    // loop thorugh blogContentArr and create either blog heading or parent post. if parent post, create media and children post (with media) as well
  var createAllBlogContent = createdBlogMediaJoinTables
    .then(BlogId => {
      var blogContentPromiseArr = []

      blogContentArr.forEach(content => {
        // console.log('blogContent element', content)
        if (!content.isPost) {
          var headingInput = content.Heading
          var createHeadingPromise = db.BlogHeading.create({
            BlogId: BlogId,
            title: headingInput.title,
            loadSequence: headingInput.loadSequence
          })
            .then(createdHeading => {
              return 'heading promise done'
            })
          blogContentPromiseArr.push(createHeadingPromise)
        } else {
          // parent post. postmedia join table. child post.
          // what if location has never been saved in db before? what if arrays are not given?
          var parentPostInput = content.ParentPost
          var parentPostObj = {
            BlogId: BlogId,
            title: parentPostInput.title,
            textContent: parentPostInput.textContent,
            description: parentPostInput.description,
            loadSequence: parentPostInput.loadSequence,
            LocationId: parentPostInput.LocationId,
            contentOnly: parentPostInput.contentOnly
          }
          if (!parentPostInput.contentOnly) {
            parentPostObj.start = parentPostInput.start
            parentPostObj.startDay = parentPostInput.startDay
            parentPostObj.endDay = parentPostInput.endDay
            parentPostObj.eventType = parentPostInput.eventType
          }
          // console.log('parentPostObj', parentPostObj)

          var createdParentPost = db.Post.create(parentPostObj)

          var parentPostPromise = createdParentPost
            .then(parentPost => {
              var ParentPostId = parentPost.id
              // create mediaposts join table rows here
              var mediaContentArr = parentPostInput.mediaContentArr

              var mediaContentPromiseArr = []

              mediaContentArr.forEach(mediumInput => {
                // console.log('mediumInput for parent post', mediumInput)
                var mediaPromise = db.MediaPosts.create({
                  MediumId: mediumInput.MediumId,
                  PostId: ParentPostId,
                  loadSequence: mediumInput.loadSequence,
                  caption: mediumInput.caption
                })
                mediaContentPromiseArr.push(mediaPromise)
              })

              return Promise.all(mediaContentPromiseArr)
                .then(values => {
                  // console.log('parent post media created', values)
                  return ParentPostId
                })
            }) // close mediaposts join table
            .then(ParentPostId => {
              console.log('second then, ParentPostId', ParentPostId)
              // create children posts here
              var childPostsArr = parentPostInput.childPostsArr
              console.log('child posts arr', childPostsArr)

              var childPostsPromiseArr = []

              childPostsArr.forEach(childPostInput => {
                var childPostObj = {
                  BlogId: BlogId,
                  ParentPostId: ParentPostId,
                  title: childPostInput.title,
                  textContent: childPostInput.textContent,
                  description: childPostInput.description,
                  loadSequence: childPostInput.loadSequence,
                  LocationId: childPostInput.LocationId,
                  contentOnly: childPostInput.contentOnly
                }
                if (!childPostInput.contentOnly) {
                  childPostObj.start = childPostInput.start
                  childPostObj.startDay = childPostInput.startDay
                  childPostObj.endDay = childPostInput.endDay
                  childPostObj.eventType = childPostInput.eventType
                }
                var createdChildPost = db.Post.create(childPostObj)

                var childPostPromise = createdChildPost
                  .then(createdChildPost => {
                    // create mediapost join table for child posts
                    var childPostMediaContentArr = childPostInput.mediaContentArr

                    var childPostMediaPromiseArr = []

                    childPostMediaContentArr.forEach(mediumInput => {
                      var childPostMediaPromise = db.MediaPosts.create({
                        PostId: createdChildPost.id,
                        MediumId: mediumInput.MediumId,
                        loadSequence: mediumInput.loadSequence,
                        caption: mediumInput.caption
                      })

                      childPostMediaPromiseArr.push(childPostMediaPromise)
                    }) // close child media for each

                    return Promise.all(childPostMediaPromiseArr)
                  })

                childPostsPromiseArr.push(childPostPromise)
              }) // close child posts for each

              // await all child posts and media to finish creating
              return Promise.all(childPostsPromiseArr)
                .then(values => {
                  return 'childPostsPromiseArr DONE'
                })
            })

          // push parent post promise into blogContentPromiseArr
          blogContentPromiseArr.push(parentPostPromise)
        }
      }) // close for each

      // promise.all blogContentPromiseArr
      return Promise.all(blogContentPromiseArr)
        .then(values => {
          console.log('blogContentPromiseArr', values)
          return BlogId
        })
    })

  return createAllBlogContent
    .then(BlogId => {
      // console.log('BlogId', BlogId)
      return db.Blog.findById(BlogId)
        .then(blog => {
          console.log('final blog', blog)
          return blog
        })
    })
}
*/
