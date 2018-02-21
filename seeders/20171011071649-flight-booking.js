'use strict'
const casual = require('casual')
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      // var booking1 = {
      //   ItineraryId: i,
      //   paxAdults: 2,
      //   paxChildren: 1,
      //   paxInfants: 0,
      //   cost: 8000,
      //   currency: 'USD',
      //   classCode: 'Business',
      //   departureDate: 1521072000, // 15th march
      //   returnDate: 1521504000,
      //   departureIATA: 'SIN',
      //   arrivalIATA: 'SEL',
      //   departureName: 'Changi International Airport',
      //   arrivalName: 'Seoul, Korea',
      //   bookingStatus: true,
      //   bookedThrough: faker.internet.url(),
      //   bookingConfirmation: faker.internet.url(),
      //   backgroundImage: 'https://storage.googleapis.com/domatodevs/flightDefaultBackground.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }
      var realDataBooking = {
        ItineraryId: i,
        paxAdults: 2,
        paxChildren: 2,
        paxInfants: 0,
        cost: 8000,
        currency: 'USD',
        classCode: 'Economy',
        departureDate: 1521072000, // 15th march
        returnDate: null,
        departureIATA: 'SIN',
        arrivalIATA: 'SEL',
        departureName: 'Singapore Changi Airport',
        arrivalName: 'Seoul, Korea',
        bookingStatus: true,
        bookedThrough: 'www.skyscanner.com',
        bookingConfirmation: '12345678abcdefg',
        backgroundImage: 'https://storage.googleapis.com/domatodevs/flightDefaultBackground.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // seedArr.push(booking1)
      seedArr.push(realDataBooking)
    }
    return queryInterface.bulkInsert('FlightBookings', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('FlightBookings', null, {})
  }
}
