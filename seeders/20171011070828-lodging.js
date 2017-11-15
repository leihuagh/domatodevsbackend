'use strict'
const casual = require('casual')
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        ItineraryId: i,
        LocationId: i,
        startLoadSequence: 5,
        endLoadSequence: 10,
        name: `Lodging ${i}`,
        notes: casual.sentences(3),
        startDay: 1,
        endDay: 6,
        startTime: 36000, // 10am checkin
        endTime: 46800, // 1pm checkout
        startDate: 1508025600, // 15th oct
        endDate: 1508457600, // 20th oct
        cost: Math.floor(Math.random() * 100) + 1,
        currency: casual.currency_code,
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        attachment: faker.internet.avatar(),
        roomType: 'Double',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Lodgings', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Lodgings', null, {})
  }
}
