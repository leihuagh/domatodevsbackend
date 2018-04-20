const MediaObject = `
  type MediaObject {
    id: ID
    MediumId: ID
    AlbumId: ID
    type: String
    objectName: String
    imageUrl: String
    youtubeUrl: String
    loadSequence: Int
    caption: String
  }
`
module.exports = MediaObject
