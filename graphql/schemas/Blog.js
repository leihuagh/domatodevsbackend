const Blog = `
  type Blog {
    id: ID!
    UserId: ID
    ItineraryId: ID
    published: Boolean
    title: String
    textContent: String
    user: User
    views: Int
    shares: Int
    likes: [User]
    headings: [BlogHeading]
    posts: [Post]
    pages: [BlogPage]
    media: [MediaObject]
    createdAt: String
  }

  type BlogLikesUsers {
    BlogId: ID!
    UserId: ID!
  }
`
module.exports = Blog
