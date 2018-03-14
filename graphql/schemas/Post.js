const Post = `
  type Post {
    id: ID!
    BlogId: ID!
    ParentPostId: ID
    LocationId: ID
    loadSequence: Int!
    contentOnly: Boolean
    textContent: String
    title: String
    description: String
    eventType: String
    start: Boolean
    startDay: Int
    endDay: Int
    blog: Blog
    location: Location
    childPosts: [Post]
  }
`
module.exports = Post
