const db = require('../../connectors')
const fetch = require('node-fetch')

// NEED TO TAKE COUNTRY CODE. what if code was not passed?
const findOrCreateLocation = async locationData => {
  let {name, address, latitude, longitude, countryCode} = locationData

  let CountryId
  if (countryCode) {
    let countryRow = await db.Country.find({where: {code: countryCode}})
    CountryId = countryRow.id
  }

  return db.Location.findOrCreate({
    where: {verified: true, name, address, latitude, longitude, CountryId}
  })
    .spread((foundOrCreated, isNewRow) => {
      console.log('found or created row', foundOrCreated)
      console.log('is new row?', isNewRow)
      return foundOrCreated.id
    })
}

module.exports = findOrCreateLocation
