'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 10; i++) {
      var seed = {
        // domatodevs@gmail.com
        UserId: 'auth0|5ab1dce98bd5067ff5786507',
        ItineraryId: i,
        permissions: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      seedArr.push(seed)
    }
    return queryInterface.bulkInsert('UsersItineraries', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UsersItineraries', null, {})
  }
}
