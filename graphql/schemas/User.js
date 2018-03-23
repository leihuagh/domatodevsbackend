const User = `
  type User {
    id: ID!
    fullName: String
    email: String
    username: String
    profilePic: String
    country: Country!
    itineraries: [Itinerary]
  }
`
module.exports = User
