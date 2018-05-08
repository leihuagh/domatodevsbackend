'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    // 10 itineraries for user1. each itinerary has 10 events
    for (var i = 1; i <= 100; i++) {
      seedArr.push({
        EventId: i,
        fileName: 'fakeSeededFileNotInGCP.jpeg',
        fileAlias: 'userFileAlias.jpeg',
        fileSize: '2MB',
        fileType: 'jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Attachments', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Attachments', null, {})
  }
}
