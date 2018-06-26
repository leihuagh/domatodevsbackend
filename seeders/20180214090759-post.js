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
        title: 'Seeded Post Title',
        // contentOnly: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        loadSequence: 4,
        textContent: '',
        title: 'Another Post title',
        // contentOnly: false,
        eventType: 'Sight-seeing',
        bucketCategory: 'Activity',
        // start: true,
        // description: 'Seeded Description 2',
        startDay: 1,
        // endDay: 1,
        LocationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        // ParentPostId: (3 * i) - 1,
        loadSequence: 5,
        textContent: '',
        title: 'Yet another post title',
        // contentOnly: false,
        eventType: 'Hiking',
        bucketCategory: 'Location',
        // start: true,
        // description: 'Seeded Description 3',
        startDay: 1,
        // endDay: 1,
        LocationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Posts', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {})
  }
}
