const Location = `
  type Location {
    id: ID!
    verified: Boolean!
    name: String
    address: String
    latitude: Float
    longitude: Float
  }
`
// const Location = `
//   type Location {
//     id: ID!
//     placeId: String!
//     verified: Boolean
//     CountryId: ID
//     country: Country
//     name: String
//     telephone: String
//     address: String
//     latitude: Float
//     longitude: Float
//     utcOffset: Int
//     openingHours: [openingHoursPeriods]
//     openingHoursText: [String]
//     imageUrl: String
//   }
//   type openingHoursPeriods {
//     open: periodObj
//     close: periodObj
//   }
//   type periodObj {
//     day: Int
//     time: String
//   }
// `
module.exports = Location
