const Medium = `
  type Medium {
    id: ID!
    type: String!
    imageUrl: String
    youtubeUrl: String
  }
  type MediaPosts {
    id: ID!
    MediumId: ID!
    PostId: ID!
    loadSequence: Int!
    caption: String
  }
  type MediaBlogs {
    id: ID!
    MediumId: ID!
    BlogId: ID!
    loadSequence: Int!
    caption: String
  }
`

module.exports = Medium
