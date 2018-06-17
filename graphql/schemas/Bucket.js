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
  type BucketList {
    buckets: [Bucket]
    countries: [Country]
  }
`

module.exports = Bucket

// bucket list is an obj containing user's bucket rows + countries arr
