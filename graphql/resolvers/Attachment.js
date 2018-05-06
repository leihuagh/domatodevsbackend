const db = require('../connectors')

const Attachment = {
  Query: {
    findAttachment: (__, data) => {
      return db.Attachment.findById(data.id)
    }
  },
  Mutation: {
    // EVENTID
    createAttachment: (__, data) => {
      return db.Attachment.create({
        EventId: data.EventId,
        fileName: data.fileName,
        fileAlias: data.fileAlias,
        fileType: data.fileType,
        fileSize: data.fileSize
      })
    },
    deleteAttachment: (__, data) => {
      return db.Attachment.destroy({where: {id: data.id}})
    }
  }
}

module.exports = Attachment
