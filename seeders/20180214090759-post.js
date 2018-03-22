'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    seedArr.push({
      BlogId: 1,
      loadSequence: 2,
      textContent: 'All Tibetans will require an e-visa to travel to India, unless you are the Domai Lama',
      title: 'e-Visa',
      contentOnly: true
    })
    seedArr.push({
      BlogId: 1,
      loadSequence: 4,
      textContent: 'Seeded Child Post 1',
      contentOnly: false,
      eventType: 'Activity',
      start: true,
      description: 'Seeded Description 1',
      startDay: 1,
      endDay: 1,
      LocationId: 1
    })
    seedArr.push({
      BlogId: 1,
      ParentPostId: 2,
      loadSequence: 5,
      textContent: 'Seeded Child Post 2',
      contentOnly: false,
      eventType: 'Activity',
      start: true,
      description: 'Seeded Description 2',
      startDay: 1,
      endDay: 1,
      LocationId: 1
    })
    return queryInterface.bulkInsert('Posts', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {})
  }
}
