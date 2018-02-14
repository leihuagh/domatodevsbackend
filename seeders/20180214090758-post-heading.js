'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    seedArr.push({
      PostId: 1,
      loadSequence: 1,
      content: 'Seeded Post Heading'
    })
    return queryInterface.bulkInsert('PostHeadings', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PostHeadings', null, {})
  }
}
