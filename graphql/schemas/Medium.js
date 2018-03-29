const Medium = `
  type Medium {
    id: ID!
    url: String!
    type: String!
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
