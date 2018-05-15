'use strict'
const faker = require('faker')
const casual = require('casual')

module.exports = {
  up: function (queryInterface, Sequelize) {
    let seedArr = []
    // for each itinerary i
    for (var i = 1; i <= 10; i++) {
      // for each location j
      // locations 1 - 6 day 2. 7 - 10, 11 day 2
      for (var j = 1; j <= 6; j++) {
        seedArr.push({
          ItineraryId: i,
          eventType: 'Sightseeing',
          startDay: 1,
          startTime: 28800 + (j * 3600),
          endTime: 28800 + (j * 3600) + 3600,
          loadSequence: j,
          notes: 'Seeded notes blah blah blah\nAnother new line',
          cost: '30',
          currency: 'SGD',
          bookingService: faker.internet.url(),
          bookingConfirmation: '123456abcdefg',
          LocationId: j,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      for (var k = 7; k <= 10; k++) {
        seedArr.push({
          ItineraryId: i,
          eventType: 'Sightseeing',
          startDay: 2,
          startTime: 28800 + ((k - 6) * 3600),
          endTime: 28800 + ((k - 6) * 3600) + 3600,
          loadSequence: (k - 6),
          notes: 'More seeded notes',
          cost: '20000',
          currency: 'KRW',
          bookingService: faker.internet.url(),
          bookingConfirmation: 'abcdef12345',
          LocationId: k,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      seedArr.push({
        ItineraryId: i,
        eventType: 'Event with NO LOCATION',
        startDay: 2,
        loadSequence: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Events', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Events', null, {})
  }
}
