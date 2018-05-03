const User = `
  type User {
    id: ID!
    fullName: String
    email: String
    username: String
    profilePic: String
    bio: String
    CountryId: ID
    country: Country
    itineraries: [Itinerary]
    albums: [Album]
    blogs: [Blog]
  }
`
module.exports = User
