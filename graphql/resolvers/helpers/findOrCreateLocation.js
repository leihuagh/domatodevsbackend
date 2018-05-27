const db = require('../../connectors')
const fetch = require('node-fetch')

// NEEDS TO UPDATE FOR CREATEEVENT -> LOCATIONDATA CAN BE VERIFIED OR NOT.

// this fxn takes in googlePlaceData obj return LocationId
// function findOrCreateLocation (google) {
//   return db.Location.find({where: { placeId: google.placeId }})
//     .then(found => {
//       return found.id
//     })
//     .catch(() => {
//       if (google.countryCode) {
//         return db.Country.find({where: { code: google.countryCode }})
//           .then(country => {
//             return db.Location.create({
//               placeId: google.placeId,
//               name: google.name,
//               telephone: google.telephone,
//               CountryId: country.id,
//               address: google.address,
//               latitude: google.latitude,
//               longitude: google.longitude,
//               utcOffset: google.utcOffset,
//               openingHours: google.openingHours,
//               openingHoursText: google.openingHoursText,
//               imageUrl: google.imageUrl
//             })
//               .then(createdLocation => {
//                 return createdLocation.id
//               })
//           })
//       } else {
//         // if country code doesnt exist. what if lat/lng etc doesnt exist
//         console.log('reverse geocode to find countryCode')
//         var latitude = google.latitude
//         var longitude = google.longitude
//         if (!latitude || !longitude) {
//           console.log('errr lat lng missing')
//           return
//         }
//         var apiKey = process.env.GOOGLE_API_KEY
//         var reverseGeocodeUri = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${latitude},${longitude}`
//
//         return fetch(reverseGeocodeUri)
//           .then(response => {
//             return response.json()
//           })
//           .then(json => {
//             console.log(json)
//             var countryCode = null
//             json.results.forEach(e => {
//               if (e.types.includes('country')) {
//                 countryCode = e.address_components[0].short_name
//               }
//             })
//             // console.log('country code', countryCode)
//
//             return db.Country.find({where: { code: countryCode }})
//               .then(country => {
//                 return db.Location.create({
//                   placeId: google.placeId,
//                   name: google.name,
//                   telephone: google.telephone,
//                   CountryId: country.id,
//                   latitude: google.latitude,
//                   longitude: google.longitude,
//                   address: google.address,
//                   openingHours: google.openingHours,
//                   openingHoursText: google.openingHoursText,
//                   imageUrl: google.imageUrl
//                 })
//                   .then(createdLocation => {
//                     return createdLocation.id
//                   })
//               })
//           })
//           .catch(err => {
//             console.log(err)
//           })
//       }
//     }) // close catch
// } // close fxn definition

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
