'use strict'
const faker = require('faker')
const casual = require('casual')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      // seedArr.push({
      //   ItineraryId: i,
      //   LocationId: 1,
      //   locationAlias: 'Seeded Activity Alias',
      //   loadSequence: 3,
      //   startDay: 2,
      //   endDay: 2,
      //   description: `Seeded Activity ${i}`,
      //   notes: casual.sentences(3),
      //   startTime: 50400, // 2pm 1970
      //   endTime: 57600, // 4pm
      //   utcOffset: 480,
      //   cost: Math.floor(Math.random() * 100) + 1,
      //   currency: casual.currency_code,
      //   bookingStatus: true,
      //   bookedThrough: faker.internet.url(),
      //   bookingConfirmation: faker.internet.url(),
      //   backgroundImage: 'https://storage.googleapis.com/domatodevs/activityDefaultBackground.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // })

      var activity1 = {
        ItineraryId: i,
        LocationId: 6,
        locationAlias: 'Seeded Activity Alias',
        loadSequence: 7,
        startDay: 1,
        endDay: 1,
        description: `Sightseeing around Myeongdong`,
        notes: casual.sentences(3),
        startTime: 73800, // 8.30pm
        endTime: 77400, // 9.30pm
        utcOffset: 540,
        cost: 10000,
        currency: 'KRW',
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/activityDefaultBackground.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      var activity2 = {
        ItineraryId: i,
        LocationId: 7,
        locationAlias: 'Seeded Activity Alias',
        loadSequence: 1,
        startDay: 2,
        endDay: 2,
        description: `Buying souveneirs at Myeongdong`,
        notes: casual.sentences(3),
        startTime: 39600, // 11am
        endTime: 43200, // 12nn
        utcOffset: 540,
        cost: 50000,
        currency: 'KRW',
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/activityDefaultBackground.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      var activity3 = {
        ItineraryId: i,
        LocationId: 7,
        locationAlias: 'Seeded Activity Alias',
        loadSequence: 2,
        startDay: 2,
        endDay: 2,
        description: `Massage`,
        notes: casual.sentences(3),
        startTime: 43200, // 12nn
        endTime: 46800, // 1pm
        utcOffset: 540,
        cost: 30000,
        currency: 'KRW',
        bookingStatus: true,
        bookedThrough: faker.internet.url(),
        bookingConfirmation: faker.internet.url(),
        backgroundImage: 'https://storage.googleapis.com/domatodevs/activityDefaultBackground.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      seedArr.push(activity1, activity2, activity3)
    }
    return queryInterface.bulkInsert('Activities', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Activities', null, {})
  }
}
