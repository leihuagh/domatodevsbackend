'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    // seeding headings for 10 blogs
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        BlogId: i,
        MediumId: 2,
        loadSequence: 1,
        title: 'Seeded Header 1 --- Before the Trip',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        MediumId: 3,
        loadSequence: 3,
        title: 'Seeded Header 2 --- Day 1',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('BlogHeadings', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BlogHeadings', null, {})
  }
}
