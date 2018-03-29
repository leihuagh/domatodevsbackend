const Input = `
  input LoadSequence {
    type: String!
    id: Int!
    loadSequence: Int!
    day: Int!
    start: Boolean
    diff: Int
  }
  input EventsToBeDeleted {
    type: String!
    id: Int!
  }
  input googlePlaceData {
    placeId: String!
    countryCode: String
    name: String
    address: String
    telephone: String
    latitude: Float
    longitude: Float
    utcOffset: Int
    openingHours: [openingHoursPeriodsInput]
    openingHoursText: [String],
    imageUrl: String
  }
  input openingHoursPeriodsInput {
    close: periodObjInput
    open: periodObjInput
  }
  input periodObjInput {
    day: Int
    time: String
  }
  input attachmentInput {
    arrivalDeparture: String
    fileName: String
    fileAlias: String
    fileType: String
    fileSize: String
  }
  input createFlightInstanceInput {
    flightNumber: String
    airlineCode: String
    airlineName: String
    departureIATA: String
    arrivalIATA: String
    departureAirport: String
    arrivalAirport: String
    departureCityCountry: String
    arrivalCityCountry: String
    departureTerminal: String
    arrivalTerminal: String
    startDay: Int
    endDay: Int
    startTime: Int
    endTime: Int
    durationMins: Int
    startLoadSequence: Int
    endLoadSequence: Int
    departureNotes: String
    arrivalNotes: String
    firstFlight: Boolean
    attachments: [attachmentInput]
  }

  input updateFlightInstanceInput {
    id: ID
    FlightBookingId: ID
    flightNumber: String,
    airlineCode: String,
    airlineName: String,
    departureIATA: String
    arrivalIATA: String
    departureAirport: String
    arrivalAirport: String
    departureCityCountry: String
    arrivalCityCountry: String
    departureTerminal: String
    arrivalTerminal: String
    startDay: Int
    endDay: Int
    startTime: Int
    endTime: Int
    durationMins: Int
    startLoadSequence: Int
    endLoadSequence: Int
    departureNotes: String
    arrivalNotes: String
    firstFlight: Boolean
    attachments: [attachmentInput]
    addAttachments: [attachmentInput]
    removeAttachments: [ID]
  }

  input createBlogContentInput {
    isPost: Boolean,
    Heading: createHeadingInput
    ParentPost: createParentPostInput
  }

  input createHeadingInput {
    loadSequence: Int
    title: String
  }

  input createParentPostInput {
    loadSequence: Int
    contentOnly: Boolean
    title: String
    textContent: String
    description: String
    mediaContentArr: [mediumInput]
    LocationId: ID
    start: Boolean
    startDay: Int
    endDay: Int
    eventType: String
    childPostsArr: [createChildPostInput]
  }

  input createChildPostInput {
    loadSequence: Int
    contentOnly: Boolean
    title: String
    textContent: String
    description: String
    mediaContentArr: [mediumInput]
    LocationId: ID
    start: Boolean
    startDay: Int
    endDay: Int
    eventType: String
  }

  input mediumInput {
    MediumId: ID
    loadSequence: Int
    caption: String
  }
`
module.exports = Input
