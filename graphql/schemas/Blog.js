const Blog = `
  type Blog {
    id: ID!
    UserId: ID
    ItineraryId: ID
    published: Boolean
    title: String
    textContent: String
    headings: [BlogHeading]
    posts: [Post]
  }
`
module.exports = Blog
