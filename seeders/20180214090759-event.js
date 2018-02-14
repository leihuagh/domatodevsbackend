'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    seedArr.push({
      PostId: 1,
      loadSequence: 1,
      content: 'Seeded Parent Event'
    })
    seedArr.push({
      PostId: 1,
      ParentEventId: 1,
      loadSequence: 2,
      content: 'Seeded Child Event 1'
    })
    seedArr.push({
      PostId: 1,
      ParentEventId: 1,
      loadSequence: 3,
      content: 'Seeded Child Event 2'
    })
    return queryInterface.bulkInsert('Events', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Events', null, {})
  }
}
