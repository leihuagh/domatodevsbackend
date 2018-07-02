const db = require('../../connectors')

// will either find or create hastag and return HashtagId
const findOrCreateHashtag = async string => {
// no spaces or special chars allowed. restrict in input field
  console.log('tag name', string)
  return db.Hashtag.findOrCreate({where: {name: string}})
    .spread(function (foundOrCreated, newRow) {
      console.log('found or created', foundOrCreated)
      console.log('is new row?', newRow)
      return foundOrCreated.id
    })
}

module.exports = findOrCreateHashtag
