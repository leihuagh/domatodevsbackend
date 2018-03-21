'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    // var seedArr = []
    // for (var i = 1; i <= 50; i++) {
    //   seedArr.push({
    //     BlogId: 1,
    //     UserId: i,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   })
    // }
    // return queryInterface.bulkInsert('BlogLikesUsers', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BlogLikesUsers', null, {})
  }
}
