 const Mutation = `
  type Mutation {
    changingLoadSequence(input:[changingLoadSequenceInput]): Boolean

    deleteMultipleEvents(input:[ID]): Boolean

    onAuth0UserAuthentication(idToken: String!): User

    updateUserProfile(CountryId: ID, fullName: String, bio: String, profilePic: String): User

    createItinerary(UserId: String!, name:String!, days: Int!, startDate:Int, description: String): Itinerary

    updateItineraryDetails(id: ID!, name:String, days: Int, startDate:Int, description: String, isPrivate: Boolean, countries: [ID]): Itinerary

    createCountriesItineraries(ItineraryId: ID!, CountryId: ID!): CountriesItineraries

    deleteCountriesItineraries(ItineraryId: ID!, CountryId:ID!): Boolean

    deleteItinerary(id: ID!): Boolean

    createEvent(ItineraryId: ID!, eventType: String, startDay: Int!, startTime: Int, endTime: Int, loadSequence: Int!, notes: String, cost: String, currency: String, bookingService: String, bookingConfirmation: String, locationData: locationDataInput, LocationId: ID): Event

    updateEvent(id: ID!, eventType: String, startDay: Int, startTime: Int, endTime: Int, loadSequence: Int, notes: String, cost: String, currency: String, bookingService: String, bookingConfirmation: String, locationData: locationDataInput, LocationId: ID): Event

    deleteEvent(id: ID!): Boolean

    createAttachment(EventId: ID!, fileName: String, fileAlias: String, fileType: String, fileSize: String): Attachment

    deleteAttachment(id: ID!): Boolean

    createBlog(UserId: ID!, title: String) : Blog

    updateBlog(id: ID!, ItineraryId: ID, title: String, days: Int, published: Boolean, MediumId: ID, hashtags:[String]): Blog

    deleteBlog(id: ID!): Boolean

    increaseBlogViews(id: ID!): Boolean

    createBlogHeading(BlogId: ID!, loadSequence: Int!, title: String): BlogHeading

    updateBlogHeading(id: ID!, loadSequence: Int, title: String): BlogHeading

    deleteBlogHeading(id: ID!): Boolean

    createPost(BlogId: ID!, ParentPostId: ID, loadSequence: Int!, title: String): Post

    updatePost(id: ID!, ParentPostId: ID, loadSequence: Int, locationData: locationDataInput, LocationId: ID, contentOnly: Boolean, title: String, textContent: String, description: String, eventType: String, start: Boolean, startDay: Int, endDay: Int, startTime: Int, endTime: Int, hashtags: [String], media: [updatePostMediaInput]): Post

    updateMultiplePosts(input: [updateMultiplePostsInput]): Boolean

    deletePost(id: ID!): Boolean

    createAlbum(UserId: ID!, title: String, description: String): Album

    updateAlbum(id: ID!, title: String, description: String): Album

    deleteAlbum(id: ID!): Boolean

    createMedia(AlbumId: ID!, media: [createMediaInput]!): Boolean

    moveMediaToAlbum(AlbumId: ID!, media: [ID]!): Boolean

    deleteMedia(input: [ID]!): Boolean

    createMediaPost(PostId: ID!, MediumId: ID!, loadSequence: Int!, caption: String): MediaPosts

    deleteMediaPost(id: ID!): Boolean

    updateMediaPost(id: ID!, loadSequence: Int, caption: String): MediaPosts

    toggleBlogLikes(BlogId: ID!, UserId: ID!): Boolean

    reorderMediaPost(input: [reorderMediaPostInput]): Boolean

    reorderBlogContent(input: [reorderBlogContentInput]): Boolean

    createHashtagPost(PostId: ID!, name: String!): HashtagsPosts

    deleteHashtagPost(id: ID!): Boolean

    createHashtagBlog(BlogId: ID!, name: String!): HashtagsBlogs

    deleteHashtagBlog(id: ID!): Boolean
  }
`
module.exports = Mutation

/*
createLocation(placeId: String!, verified: Boolean, CountryId: ID, name:String, telephone: String, latitude:String, longitude:String, address:String, utcOffset: Int, openingHours: String, openingHoursText: String, imageUrl: String): Location
*/

/*

reorderMediaBlog(input: [reorderMediaBlogInput]): Boolean

createMediaBlog(BlogId: ID!, MediumId:ID!, loadSequence: Int!, caption: String): MediaBlogs

deleteMediaBlog(id: ID!): Boolean

updateMediaBlog(id:ID!, loadSequence: Int, caption: String): MediaBlogs
*/
