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
    }
  },
  Query: {
    allBlogs: () => {
      return db.Blog.findAll()
    },
    findBlog: (__, data) => {
      return db.Blog.findById(data.id)
    }
  }
}

module.exports = Blog
