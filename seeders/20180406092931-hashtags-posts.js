'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        PostId: 3 * i,
        HashtagId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        PostId: 3 * i,
        HashtagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        PostId: 3 * i,
        HashtagId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('HashtagsPosts', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HashtagsPosts', null, {})
  }
}
