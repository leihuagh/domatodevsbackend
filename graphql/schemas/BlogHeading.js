const BlogHeading = `
  type BlogHeading {
    id: ID!
    BlogId: ID!
    loadSequence: Int
    title: String
    medium: Medium
    caption: String
  }
`
module.exports = BlogHeading
