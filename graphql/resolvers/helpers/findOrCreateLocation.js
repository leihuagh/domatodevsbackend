const db = require('../../connectors')
const fetch = require('node-fetch')

// NEED TO TAKE COUNTRY CODE. what if code was not passed?
function findOrCreateLocation (locationData) {
  let countryCode = locationData.countryCode
  let tempObj = {
    verified: true,
    name: locationData.name,
    address: locationData.address,
    latitude: locationData.latitude,
    longitude: locationData.longitude
  }
  if (countryCode) {
    var locationObj = db.Country.find({where: {code: countryCode}})
      .then(foundCountry => {
        tempObj.CountryId = foundCountry.id
        return tempObj
      })
  } else {
    locationObj = Promise.resolve(tempObj)
  }

  return locationObj
    .then(locationObj => {
      return db.Location.findOrCreate({
        where: {
          verified: locationObj.verified,
          name: locationObj.name,
          address: locationObj.address,
          latitude: locationObj.latitude,
          longitude: locationObj.longitude,
          CountryId: locationObj.CountryId
        }
      })
        .spread((foundOrCreated, isNewRow) => {
          console.log('found or created row', foundOrCreated)
          console.log('is new row?', isNewRow)
          return foundOrCreated.id
        })
    })
}

module.exports = findOrCreateLocation
