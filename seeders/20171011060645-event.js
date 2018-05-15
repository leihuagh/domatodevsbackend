'use strict'
const faker = require('faker')
const casual = require('casual')

module.exports = {
  up: function (queryInterface, Sequelize) {
    let seedArr = []
    // for each itinerary i
    for (var i = 1; i <= 10; i++) {
      // for each location j
      for (var j = 1; j <= 10; j++) {
        seedArr.push({
          ItineraryId: i,
          eventType: '{"blocks":[{"key":"dhq60","text":"Sightseeing","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          startDay: 1,
          startTime: 28800 + (j * 3600),
          endTime: 28800 + (j * 3600) + 3600,
          loadSequence: j,
          notes: '{"blocks":[{"key":"dhq60","text":"Seeded notes in Draft.js JSON. Blah blah blah.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          cost: '{"blocks":[{"key":"dhq60","text":"30","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          currency: '{"blocks":[{"key":"dhq60","text":"SGD","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          bookingService: `{"blocks":[{"key":"dhq60","text":"${faker.internet.url()}","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          bookingConfirmation: `{"blocks":[{"key":"dhq60","text":"1234567abcdefg","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          LocationId: j,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      seedArr.push({
        ItineraryId: i,
        eventType: '{"blocks":[{"key":"dhq60","text":"Lunch, no Location","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        startDay: 1,
        loadSequence: 11,
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
