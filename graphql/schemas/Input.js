const Input = `
  input LoadSequence {
    event: String!
    id: Int!
    loadSequence: Int!
    day: Int!
  }
  input googlePlaceData {
    placeId: String!
    countryCode: String
    name: String
    latitude: Float
    longitude: Float
    address: String
    openingHours: String
  }
  input attachmentInfo {
    fileName: String
    fileAlias: String
    fileType: String
    fileSize: String
  }
`
module.exports = Input
