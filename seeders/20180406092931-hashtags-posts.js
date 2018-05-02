'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        PostId: 3 * i,
        HashtagId: 1
      })
      seedArr.push({
        PostId: 3 * i,
        HashtagId: 2
      })
      seedArr.push({
        PostId: 3 * i,
        HashtagId: 3
      })
    }
    return queryInterface.bulkInsert('HashtagsPosts', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HashtagsPosts', null, {})
  }
}
