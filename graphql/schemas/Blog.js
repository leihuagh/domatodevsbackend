const Blog = `
  type Blog {
    id: ID!
    UserId: ID
    ItineraryId: ID
    published: Boolean
    title: String
    textContent: String
    user: User
    headings: [BlogHeading]
    posts: [Post]
    pages: [BlogPage]
  }
`
module.exports = Blog
