'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        name: `Itinerary ${i}`,
        description: 'SEEDED ITINERARY DESCRIPTION',
        days: 6,
        startDate: 1529020800, // 15th june 2018 friday
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Itineraries', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Itineraries', null, {})
  }
}
