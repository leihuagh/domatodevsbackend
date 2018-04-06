const Album = `
  type Album {
    id: ID!
    UserId: ID!
    title: String
    description: String
    media: [Medium]
    user: User
  }
`

module.exports = Album
