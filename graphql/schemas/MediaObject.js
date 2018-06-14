// THIS COMBINES MEDIUM ROW + JOIN TABLE ROW INTO 1 OBJECT
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
