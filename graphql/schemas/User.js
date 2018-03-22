const User = `
  type User {
    id: ID!
    fullName: String
    username: String
    email: String
    profilePic: String
    country: Country!
    itineraries: [Itinerary]
  }
`
module.exports = User
