'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    let seedArr = []
    seedArr.push({
      UserId: 'auth0|5ab1dce98bd5067ff5786507',
      LocationId: 11,
      notes: 'Remember to bring an umbrella',
      eventType: 'Sightseeing',
      bucketCategory: 'Activity',
      thumbnailUrl: 'http://www.fortsiloso.com/z_images/entrance.jpg',
      visited: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    seedArr.push({
      UserId: 'auth0|5ab1dce98bd5067ff5786507',
      LocationId: 12,
      notes: 'Random notes',
      eventType: 'Sightseeing',
      bucketCategory: 'Activity',
      thumbnailUrl: 'http://www.fortsiloso.com/z_images/entrance.jpg',
      visited: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    seedArr.push({
      UserId: 'auth0|5ab1dce98bd5067ff5786507',
      LocationId: 13,
      notes: 'Random notes',
      eventType: 'Sightseeing',
      bucketCategory: 'Location',
      thumbnailUrl: 'http://www.fortsiloso.com/z_images/entrance.jpg',
      visited: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    seedArr.push({
      UserId: 'auth0|5ab1dce98bd5067ff5786507',
      LocationId: 14,
      notes: 'Random notes',
      eventType: 'Sightseeing',
      bucketCategory: 'Activity',
      thumbnailUrl: 'http://www.fortsiloso.com/z_images/entrance.jpg',
      visited: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    seedArr.push({
      UserId: 'auth0|5ab1dce98bd5067ff5786507',
      LocationId: 15,
      notes: 'Random notes',
      eventType: 'Sightseeing',
      bucketCategory: 'Activity',
      thumbnailUrl: 'http://www.fortsiloso.com/z_images/entrance.jpg',
      visited: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    seedArr.push({
      UserId: 'auth0|5ab1dce98bd5067ff5786507',
      LocationId: 16,
      notes: 'Random notes',
      eventType: 'Sightseeing',
      bucketCategory: 'Location',
      thumbnailUrl: 'http://www.fortsiloso.com/z_images/entrance.jpg',
      visited: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return queryInterface.bulkInsert('Buckets', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Buckets', null, {})
  }
}
