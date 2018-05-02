'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        BlogId: i,
        HashtagId: 1
      })
      seedArr.push({
        BlogId: i,
        HashtagId: 2
      })
      seedArr.push({
        BlogId: i,
        HashtagId: 3
      })
      seedArr.push({
        BlogId: i,
        HashtagId: 4
      })
      seedArr.push({
        BlogId: i,
        HashtagId: 5
      })
      seedArr.push({
        BlogId: i,
        HashtagId: 6
      })
    }
    return queryInterface.bulkInsert('HashtagsBlogs', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HashtagsBlogs', null, {})
  }
}
