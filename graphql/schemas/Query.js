const Query = `
  type Query {
    allCountries: [Country!]!
    allUsers: [User!]!
    allItineraries: [Itinerary]
    getAllPublishedBlogs: [Blog]
    itinerariesByUser: [Itinerary]
    findUser(id: ID!): User
    getUserProfile: User
    getUserBlogs: [Blog]
    findItinerary(id: ID!): Itinerary
    findLocation(id: ID!): Location
    findEvent(id: ID!): Event
    findBlogHeading(id: ID!): BlogHeading
    findPost(id: ID!): Post
    findBlog(id: ID!): Blog
    authorization: Boolean
    findCountriesItineraries(CountryId: ID!, ItineraryId: ID!): CountriesItineraries
    permissions(UserId: ID!, ItineraryId: ID!): UsersItineraries
    findAttachment(id: ID!): Attachment
    findAlbum(id: ID!): Album
    getUserAlbums: [Album]
    findMedium(id: ID!): Medium
    findMediaPost(id: ID!): MediaPosts
    findHashtag(id: ID!): Hashtag
    getAllHashtags: [Hashtag]
    getUserBucketList: [Bucket]
    findBucket(id: ID!): Bucket
  }
`
module.exports = Query
