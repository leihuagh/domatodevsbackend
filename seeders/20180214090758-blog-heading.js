'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    // seeding headings for 10 blogs
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        BlogId: i,
        loadSequence: 1,
        title: 'Seeded Header 1 --- Before the Trip'
      })
      seedArr.push({
        BlogId: i,
        loadSequence: 3,
        title: 'Seeded Header 2 --- Day 1'
      })
    }
    return queryInterface.bulkInsert('BlogHeadings', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BlogHeadings', null, {})
  }
}
