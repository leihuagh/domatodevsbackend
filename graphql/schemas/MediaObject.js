const MediaObject = `
  type MediaPostObject {
    id: ID
    MediumId: ID
    PostId: ID
    loadSequence: Int
    caption: String
    AlbumId: ID
    type: String
    objectName: String
    imageUrl: String
    youtubeUrl: String
  }
`
module.exports = MediaObject

// type MediaBlogObject {
//   id: ID
//   MediumId: ID
//   BlogId: ID
//   loadSequence: Int
//   caption: String
//   AlbumId: ID
//   type: String
//   objectName: String
//   imageUrl: String
//   youtubeUrl: String
// }
