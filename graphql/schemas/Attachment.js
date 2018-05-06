const Attachment = `
  type Attachment {
    id: ID!
    EventId: ID!
    fileName: String
    fileAlias: String
    fileType: String
    fileSize: String
  }
`
module.exports = Attachment
