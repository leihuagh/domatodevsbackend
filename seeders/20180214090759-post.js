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
        currency: 'SGD',
        cost: 100,
        bookingService: 'www.marinabaysands.sg',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        loadSequence: 4,
        textContent: '',
        title: 'Another Post title',
        eventType: 'Sight-seeing',
        bucketCategory: 'Activity',
        startDay: 1,
        currency: 'USD',
        cost: 80.50,
        bookingService: 'www.airbnb.com.sg',
        LocationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        loadSequence: 5,
        textContent: '',
        title: 'Yet another post title',
        eventType: 'Hiking',
        bucketCategory: 'Location',
        startDay: 1,
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
