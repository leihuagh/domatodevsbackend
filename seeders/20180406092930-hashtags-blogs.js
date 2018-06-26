'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        BlogId: i,
        HashtagId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        HashtagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        HashtagId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        HashtagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        HashtagId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        HashtagId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('HashtagsBlogs', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HashtagsBlogs', null, {})
  }
}
