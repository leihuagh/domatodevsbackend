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
    countryCode: String
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

  input createMediaInput {
    type: String!
    objectName: String
    imageUrl: String
    youtubeUrl: String
  }
`

module.exports = Input

/*
input reorderMediaBlogInput {
  id: ID!
  loadSequence: Int!
}
input updateBlogMediaInput {
  MediumId: ID!
  loadSequence: Int
  caption: String
}
*/
