const Blog = `
  type Blog {
    id: ID!
    UserId: ID
    ItineraryId: ID
    title: String
    user: User
    days: Int
    likes: [User]
    pages: [BlogPage]
    headings: [BlogHeading]
    posts: [Post]
    medium: Medium
    hashtags: [Hashtag]
    views: Int
    shares: Int
    published: Boolean
    publishDate: String
    timeFromPublishDate: String
    createdAt: String
    updatedAt: String
  }

  type BlogLikesUsers {
    BlogId: ID!
    UserId: ID!
  }
`
module.exports = Blog

/*
media: [MediaBlogObject]
textContent: String
*/
