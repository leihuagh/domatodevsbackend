'use strict'
const faker = require('faker')
const casual = require('casual')

module.exports = {
  up: function (queryInterface, Sequelize) {
    let seedArr = []
    // for each itinerary i
    for (var i = 1; i <= 10; i++) {
      // var activity1 = {
      //   ItineraryId: i,
      //   LocationId: 6,
      //   locationAlias: 'Seeded Activity Alias',
      //   loadSequence: 7,
      //   startDay: 1,
      //   endDay: 1,
      //   description: `Sightseeing around Myeongdong`,
      //   notes: casual.sentences(3),
      //   startTime: 73800, // 8.30pm
      //   endTime: 77400, // 9.30pm
      //   utcOffset: 540,
      //   cost: 10000,
      //   currency: 'KRW',
      //   bookingStatus: true,
      //   bookedThrough: faker.internet.url(),
      //   bookingConfirmation: faker.internet.url(),
      //   backgroundImage: 'https://storage.googleapis.com/domatodevs/activityDefaultBackground.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }
      // var activity2 = {
      //   ItineraryId: i,
      //   LocationId: 7,
      //   locationAlias: 'Seeded Activity Alias',
      //   loadSequence: 1,
      //   startDay: 2,
      //   endDay: 2,
      //   description: `Buying souveneirs at Myeongdong`,
      //   notes: casual.sentences(3),
      //   startTime: 39600, // 11am
      //   endTime: 41400, // 11.30am
      //   utcOffset: 540,
      //   cost: 50000,
      //   currency: 'KRW',
      //   bookingStatus: true,
      //   bookedThrough: faker.internet.url(),
      //   bookingConfirmation: faker.internet.url(),
      //   backgroundImage: 'https://storage.googleapis.com/domatodevs/activityDefaultBackground.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }
      // var activity3 = {
      //   ItineraryId: i,
      //   LocationId: 7,
      //   locationAlias: 'Seeded Activity Alias',
      //   loadSequence: 2,
      //   startDay: 2,
      //   endDay: 2,
      //   description: `Massage`,
      //   notes: casual.sentences(3),
      //   startTime: 41400, // 11.30am
      //   endTime: 43200, // 12nn
      //   utcOffset: 540,
      //   cost: 30000,
      //   currency: 'KRW',
      //   bookingStatus: true,
      //   bookedThrough: faker.internet.url(),
      //   bookingConfirmation: faker.internet.url(),
      //   backgroundImage: 'https://storage.googleapis.com/domatodevs/activityDefaultBackground.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }
      // var activity4 = {
      //   ItineraryId: i,
      //   LocationId: 7,
      //   locationAlias: 'Seeded Activity Alias',
      //   loadSequence: 3,
      //   startDay: 2,
      //   endDay: 2,
      //   description: `Massage Again`,
      //   notes: casual.sentences(3),
      //   startTime: 43200, // 12nn
      //   endTime: 46800, // 1pm
      //   utcOffset: 540,
      //   cost: 30000,
      //   currency: 'KRW',
      //   bookingStatus: true,
      //   bookedThrough: faker.internet.url(),
      //   bookingConfirmation: faker.internet.url(),
      //   backgroundImage: 'https://storage.googleapis.com/domatodevs/activityDefaultBackground.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }

      for (var j = 1; j <= 10; j++) {
        // for each location j
        seedArr.push({
          ItineraryId: i,
          eventType: 'Sightseeing',
          startDay: 1,
          startTime: 28800 + (j * 3600),
          endTime: 28800 + (j * 3600) + 3600,
          loadSequence: j,
          notes: casual.sentences(3),
          cost: 30,
          currency: 'SGD',
          bookingService: faker.internet.url(),
          bookingConfirmation: '12345567abcdef',
          LocationId: j,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      seedArr.push({
        ItineraryId: i,
        eventType: 'Lunch, no Location',
        startDay: 1,
        loadSequence: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      // seedArr = [event1, event2, event3, event4, event5, event6, event7, event8, event9, event10]
    }
    return queryInterface.bulkInsert('Events', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Events', null, {})
  }
}
