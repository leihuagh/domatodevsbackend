# Bucket v2 changes
1. Activity, Food, Lodging, Flight, Transport replaced with model named __Event__. `Itinerary.hasMany(Event)`

  ```
  Event {
    ItineraryId: DataTypes.INTEGER,
    eventType: DataTypes.STRING,
    startDay: DataTypes.INTEGER,
    startTime: DataTypes.INTEGER, // secs since midnight
    endTime: DataTypes.INTEGER,
    loadSequence: DataTypes.INTEGER, // within each day
    notes: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bookingService: DataTypes.STRING,
    bookingConfirmation: DataTypes.STRING,
    LocationId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }
  ```
2. __Attachment__.belongsTo(Event) replaces Attachment.belongsTo(Activity) etc...

  ```
  Attachment {
    EventId
    fileName
    fileAlias
    fileType
    fileSize
  }
  ```
3. __changingLoadSequence__ resolver used for drag/drop rearrangement of events uses `changingLoadSequenceInput`. Simplified to as below:

  ```
  changingLoadSequence(input:[changingLoadSequenceInput]): Boolean

  input changingLoadSequenceInput {
    EventId: ID!
    loadSequence: Int!
    startDay: Int!
  }  
  ```
4. __Deleting multiple events__ simplified to only take an array of event ID. `deleteMultipleEvents(input:[ID]): Boolean`. Uses deleteAttachmentsFromCloud helper.

5. __deleteAttachmentsFromCloud__ helper. Given EventId, will delete all attachments for that Event from GCP.

6. __createEvent__. Create a new row in event table with ItineraryId, loadSequence, and whichever field user filled in first (name, time, locationData, LocationId). Does not allow for creating attachments. (Add attachments 'live' with createAttachment).

  No location -> verified location. findOrCreateLocation row with verified:true.

  No location -> custom location. create a Location row with verified: false.

  Verified location -> custom location. new Location row is duplicated with verified false. Replace the LocationId.

  Custom -> custom location. Just update the Location row.

  Custom -> verified location. Remove the custom Location row. replace with LocationId for findOrCreate's verified row.

  Custom location -> No location (explicitly pass key but no obj). custom Location row will be deleted. Remove LocationId from event.

  Verified location -> No location. Will not delete Location row. Only remove the LocationId from event.

7. __Location__ model has column __verified:Boolean__. If true, all columns will follow the google places API response. If false, some columns have been edited by user (eg, location name, opening hours).
