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
    startTime: Int
    endTime: Int
    blog: Blog
    location: Location
    childPosts: [Post]
    media: [MediaPostObject]
    hashtags: [Hashtag]
  }
`
module.exports = Post
