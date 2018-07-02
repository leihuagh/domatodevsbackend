const db = require('../../connectors')
const generateCloudStorageToken = require('./generateCloudStorageToken')
const fetch = require('node-fetch')

// GIVEN EVENTID, REMOVE ALL ATTACHMENTS FOR THAT EVENT FROM CLOUD STORAGE

const deleteAttachmentsFromCloud = async EventId => {
  const cloudStorageToken = await generateCloudStorageToken()
    .then(e => {
      return e.token
    })
  let allAttachmentRows = await db.Attachment.findAll({where: {EventId: EventId}})

  let fileNamesArr = allAttachmentRows.map(e => {
    return e.fileName
  })

  let uriBase = process.env.CLOUD_DELETE_URI
  let deletePromises = await Promise.all(fileNamesArr.map(async fileName => {
    fileName = fileName.replace('/', '%2F')
    let uriFull = uriBase + fileName
    return fetch(uriFull, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${cloudStorageToken}`
      }
    })
      .then(response => {
        console.log(response)
        return (response.status === 204)
      })
      .catch(err => {
        console.log('err', err)
      })
  }))

  console.log('resolved', deletePromises)
  if (deletePromises) {
    return Promise.resolve(true)
  } else {
    return Promise.resolve(false)
  }

  // var allAttachmentsPromise = db.Attachment.findAll({where: {
  //   EventId: EventId
  // }})
  //   .then(allAttachments => {
  //     var fileNamesArr = []
  //     allAttachments.forEach(e => {
  //       fileNamesArr.push(e.fileName)
  //     })
  //     return fileNamesArr
  //   })

  // return Promise.all([cloudStorageTokenPromise, allAttachmentsPromise])
  //   .then(values => {
  //     var cloudStorageToken = values[0]
  //     var allAttachments = values[1]
  //
  //     var deletedStatusPromises = []
  //
  //     allAttachments.forEach(objName => {
  //       objName = objName.replace('/', '%2F')
  //       var uriFull = uriBase + objName
  //       var deletedStatus = fetch(uriFull, {
  //         method: 'DELETE',
  //         headers: {
  //           'Authorization': `Bearer ${cloudStorageToken}`
  //         }
  //       })
  //         .then(response => {
  //           console.log(response)
  //           return (response.status === 204)
  //         })
  //         .catch(err => console.log(err))
  //       deletedStatusPromises.push(deletedStatus)
  //     })
  //
  //     // await all attachments to finish deleting before exiting fxn
  //     return Promise.all(deletedStatusPromises)
  //       .then(() => {
  //         return true
  //       })
  //       .catch(err => {
  //         console.log(err)
  //         return false
  //       })
  //   })
}

module.exports = deleteAttachmentsFromCloud
