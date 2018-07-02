const Itinerary = `
  type Itinerary {
    id: ID!
    name: String!
    description: String
    days: Int!
    startDate: Int
    isPrivate: Boolean
    countries: [Country]
    owner: User
    users: [User]
    events: [Event]
    createdAt: String
    timeFromPublishDate: String
  }
  type CountriesItineraries {
    CountryId: ID!
    ItineraryId: ID!
  }
  type UsersItineraries {
    UserId: ID!
    ItineraryId: ID!
    permissions: String!
  }
`
module.exports = Itinerary
