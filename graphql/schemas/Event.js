const Event = `
  type Event {
    id: ID!
    ItineraryId: ID!
    eventType: String
    startDay: Int
    startTime: Int
    endTime: Int
    loadSequence: Int
    notes: String
    cost: Int
    currency: String
    bookingService: String
    bookingConfirmation: String
    locationVerified: Boolean
    location: [Location]
    attachments: [Attachment]
  }
`
module.exports = Event
