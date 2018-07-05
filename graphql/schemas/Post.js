const Post = `
  type Post {
    id: ID!
    BlogId: ID!
    blog: Blog
    loadSequence: Int!
    textContent: String
    title: String
    eventType: String
    bucketCategory: String
    startDay: Int
    startTime: Int
    endTime: Int
    currency: String
    cost: Float
    bookingService: String
    LocationId: ID
    location: Location
    media: [MediaPostObject]
    hashtags: [Hashtag]
  }
`
module.exports = Post
