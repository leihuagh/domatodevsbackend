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
    days: Int
    likes: [User]
    headings: [BlogHeading]
    posts: [Post]
    pages: [BlogPage]
    media: [MediaObject]
    hashtags: [Hashtag]
    createdAt: String
  }

  type BlogLikesUsers {
    BlogId: ID!
    UserId: ID!
  }
`
module.exports = Blog
