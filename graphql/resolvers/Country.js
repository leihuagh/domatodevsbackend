const db = require('../connectors')

const Country = {
  Country: {
    locations (country) {
      return country.getLocations()
    }
  },
  Query: {
    allCountries: () => {
      return db.Country.findAll()
    }
  }
}

module.exports = Country
