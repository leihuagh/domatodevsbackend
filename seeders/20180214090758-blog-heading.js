'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    seedArr.push({
      BlogId: 1,
      loadSequence: 1,
      title: 'Before the Trip'
    })
    seedArr.push({
      BlogId: 1,
      loadSequence: 3,
      title: 'Day 1'
    })
    return queryInterface.bulkInsert('BlogHeadings', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BlogHeadings', null, {})
  }
}
