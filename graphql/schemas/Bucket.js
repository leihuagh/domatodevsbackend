const Bucket = `
  type Bucket {
    id: ID!
    UserId: ID!
    user: User
    LocationId: ID!
    location: Location
    notes: String
    eventType: String
    bucketCategory: String
    thumbnailUrl: String
    visited: Boolean
  }
`

module.exports = Bucket
