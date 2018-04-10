'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    seedArr.push({
      BlogId: 1,
      HashtagId: 1
    })
    seedArr.push({
      BlogId: 1,
      HashtagId: 2
    })
    return queryInterface.bulkInsert('HashtagsBlogs', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HashtagsBlogs', null, {})
  }
}
