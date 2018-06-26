const Medium = `
  type Medium {
    id: ID!
    AlbumId: ID!
    album: Album
    type: String!
    objectName: String
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
`

module.exports = Medium
