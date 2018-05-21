const Input = `
  input changingLoadSequenceInput {
    EventId: ID!
    loadSequence: Int!
    startDay: Int!
  }

  input locationDataInput {
    id: ID
    verified: Boolean
    name: String
    address: String
    latitude: Float
    longitude: Float
  }

  input openingHoursPeriodsInput {
    close: periodObjInput
    open: periodObjInput
  }
  input periodObjInput {
    day: Int
    time: String
  }

  input updateMultiplePostsInput {
    id: ID!
    ParentPostId: ID
    loadSequence: Int
    title: String
    textContent: String
    description: String
    contentOnly: Boolean
    start: Boolean
    startDay: Int
    endDay: Int
    eventType: String
  }

  input reorderMediaBlogInput {
    id: ID!
    loadSequence: Int!
  }

  input reorderMediaPostInput {
    id: ID!
    loadSequence: Int!
  }

  input reorderBlogContentInput {
    type: String!
    modelId: ID!
    loadSequence: Int!
  }

  input updatePostMediaInput {
    MediumId: ID!
    loadSequence: Int
    caption: String
  }

  input updateBlogMediaInput {
    MediumId: ID!
    loadSequence: Int
    caption: String
  }

  input createMediaInput {
    type: String!
    objectName: String
    imageUrl: String
    youtubeUrl: String
  }
`

module.exports = Input

// input locationDataInput {
//   id: ID
//   placeId: String!
//   countryCode: String
//   name: String
//   address: String
//   telephone: String
//   latitude: Float
//   longitude: Float
//   utcOffset: Int
//   openingHours: [openingHoursPeriodsInput]
//   openingHoursText: [String]
//   imageUrl: String
// }
