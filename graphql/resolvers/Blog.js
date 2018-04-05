const db = require('../connectors')

const Blog = {
  Blog: {
    posts (blog) {
      return blog.getPosts()
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
      const blogId = blog.id
      return db.MediaBlogs.findAll({where: {BlogId: blogId}})
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
                // console.log('medium', medium)
                const obj = {
                  ...e,
                  ...{
                    type: medium.type,
                    imageUrl: medium.imageUrl,
                    youtubeUrl: medium.youtubeUrl
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
    allBlogs: () => {
      return db.Blog.findAll()
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
      // updates only text, published boolean in the blog table
      var updatesObj = {}
      var fields = ['title', 'textContent', 'pubished', 'ItineraryId']
      fields.forEach(field => {
        if (data[field]) {
          updatesObj[field] = data[field]
        }
      })
      // console.log('updatesObj', updatesObj)
      var foundBlog = db.Blog.findById(data.id)

      return foundBlog
        .then(found => {
          // console.log('found', found)
          return found.update(updatesObj)
        })
    },
    deleteBlog: (__, data) => {
      // DELETE EVERYTHING TO DO WITH BLOG
      /*
      (X) delete all MediaBlogs
      (X) delete all BlogHeadings
      (X) delete allMediaPosts
      (X) delete all ChildPosts
      (X) delete all ParentPosts
      (X) delete all blogslikesusers
      (X) then deleteBlog
      perhaps write a beforeDestroy hook.
      add hashtag model
      */
      var BlogId = data.id
      return db.Blog.findById(BlogId)
        .then(() => {
          return db.MediaBlogs.destroy({where: {BlogId: BlogId}})
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
