const Medium = `
  type Medium {
    id: ID!
    url: String!
    type: String!
  }
  type MediaPosts {
    MediaId: ID!
    PostId: ID!
  }
`

module.exports = Medium
