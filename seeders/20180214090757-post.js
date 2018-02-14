'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    seedArr.push({
      UserId: 1,
      ItineraryId: 1
    })
    return queryInterface.bulkInsert('Posts', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {})
  }
}
