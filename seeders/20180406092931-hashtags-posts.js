'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    seedArr.push({
      PostId: 1,
      HashtagId: 1
    })
    seedArr.push({
      PostId: 1,
      HashtagId: 2
    })
    seedArr.push({
      PostId: 1,
      HashtagId: 3
    })
    seedArr.push({
      PostId: 1,
      HashtagId: 4
    })
    return queryInterface.bulkInsert('HashtagsPosts', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HashtagsPosts', null, {})
  }
}
