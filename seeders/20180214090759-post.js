'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    // seeding posts for 10 blogs
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        BlogId: i,
        loadSequence: 2,
        textContent: '',
        title: 'e-Visa',
        contentOnly: true
      })
      seedArr.push({
        BlogId: i,
        loadSequence: 4,
        textContent: 'Seeded Child Post 2',
        contentOnly: false,
        eventType: 'Activity',
        start: true,
        description: 'Seeded Description 2',
        startDay: 1,
        endDay: 1,
        LocationId: 1
      })
      seedArr.push({
        BlogId: i,
        ParentPostId: (3 * i) - 1,
        loadSequence: 5,
        textContent: 'Seeded Child Post 3',
        contentOnly: false,
        eventType: 'Activity',
        start: true,
        description: 'Seeded Description 3',
        startDay: 1,
        endDay: 1,
        LocationId: 1
      })
    }
    return queryInterface.bulkInsert('Posts', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {})
  }
}
