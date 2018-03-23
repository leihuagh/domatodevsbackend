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
               const obj = {...e,
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
    }
  }
}

module.exports = Blog
