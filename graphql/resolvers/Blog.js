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
                const obj = {
                  ...e,
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
          // console.log('createdBlog', createdBlog)
          var BlogId = createdBlog.id
          // create the blog-media join table rows.
          var blogMediaPromiseArr = []
          // need to check if mediaContentArr exists
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
              // console.log('blog media join table done')
              return BlogId
            })
        })

        // loop thorugh blogContentArr and create either blog heading or parent post. if parent post, create media and children post (with media) as well
      return createdBlogMediaJoinTables
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
          Promise.all(blogContentPromiseArr)
            .then(values => {
              console.log('blogContentPromiseArr', values)
            })
        })
    }
  }
}

module.exports = Blog
