'use strict'
const faker = require('faker')
const casual = require('casual')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      // seedArr.push({
      //   ItineraryId: i,
      //   DepartureLocationId: 4,
      //   ArrivalLocationId: 5,
      //   startLoadSequence: 1,
      //   endLoadSequence: 2,
      //   startDay: 1,
      //   endDay: 1,
      //   startTime: 32400, // 9am after flight
      //   endTime: 36000, // 10am
      //   departureNotes: casual.sentences(3),
      //   arrivalNotes: casual.sentences(3),
      //   cost: (Math.floor(Math.random() * 20) + 1) * 10,
      //   currency: casual.currency_code,
      //   bookingStatus: true,
      //   bookedThrough: faker.internet.url(),
      //   bookingConfirmation: faker.internet.url(),
      //   backgroundImage: 'https://storage.googleapis.com/domatodevs/landTransportDefaultBackground.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // })
      seedArr.push({
        ItineraryId: i,
        DepartureLocationId: 9,
        ArrivalLocationId: 10,
        startLoadSequence: 6,
        endLoadSequence: 1,
        startDay: 2,
        endDay: 3,
        startTime: 82800, // 11pm
        endTime: 7200, // 2am next day
        departureNotes: casual.sentences(3),
        arrivalNotes: casual.sentences(3),
        cost: 60000,
        currency: 'KRW',
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/landTransportDefaultBackground.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('LandTransports', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('LandTransports', null, {})
  }
}
