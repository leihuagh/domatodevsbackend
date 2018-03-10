const db = require('../connectors')

const Blog = {
  Blog: {
    posts (blog) {
      return blog.getPosts()
    },
    headings (blog) {
      return blog.getBlogHeadings()
    }
  },
  Query: {
    allBlogs: () => {
      return db.Blog.findAll()
    }
  }
}

module.exports = Blog
