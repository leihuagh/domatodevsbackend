'use strict'
const casual = require('casual')
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      // seedArr.push({
      //   ItineraryId: i,
      //   LocationId: 2,
      //   locationAlias: 'Seeded Food Alias',
      //   loadSequence: 3,
      //   startDay: 1,
      //   endDay: 1,
      //   description: `Seeded Restaurant ${i}`,
      //   notes: casual.sentences(3),
      //   startTime: 64800, // 6pm dinner
      //   endTime: 68400, // 7pm end
      //   utcOffset: 480,
      //   cost: Math.floor(Math.random() * 100) + 1,
      //   currency: casual.currency_code,
      //   bookingStatus: true,
      //   bookedThrough: faker.internet.url(),
      //   bookingConfirmation: faker.internet.url(),
      //   backgroundImage: 'https://storage.googleapis.com/domatodevs/foodDefaultBackground.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // })
      var food1 = {
        ItineraryId: i,
        LocationId: 5,
        locationAlias: 'Seeded Food Alias',
        loadSequence: 6,
        startDay: 1,
        endDay: 1,
        description: `French food in korea hmm`,
        notes: casual.sentences(3),
        startTime: 68400, // 7pm
        endTime: 73800, // 8.30pm
        utcOffset: 540,
        cost: 40000,
        currency: 'KRW',
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/foodDefaultBackground.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      var food2 = {
        ItineraryId: i,
        LocationId: 8,
        locationAlias: 'Seeded Food Alias',
        loadSequence: 4,
        startDay: 2,
        endDay: 2,
        description: `doggo's favrit chikken nuggers`,
        notes: casual.sentences(3),
        startTime: 46800, // 1pm
        endTime: 50400, // 2pm
        utcOffset: 540,
        cost: 12000,
        currency: 'KRW',
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/foodDefaultBackground.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      seedArr.push(food1, food2)
    }
    return queryInterface.bulkInsert('Food', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Food', null, {})
  }
}
