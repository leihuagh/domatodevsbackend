/*
these are for creating blog with content all at one go. shelve for now.
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
*/
/*
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
*/

/*
input attachmentInput {
  fileName: String
  fileAlias: String
  fileType: String
  fileSize: String
}
*/
