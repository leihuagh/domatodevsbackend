'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    // for (var i = 1; i <= 50; i++) {
    //   seedArr.push({
    //     BlogId: 1,
    //     UserId: i,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   })
    // }
    // only 1 seeded user.
    seedArr.push({
      BlogId: 1,
      UserId: 'auth0|5ab1dce98bd5067ff5786507',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return queryInterface.bulkInsert('BlogLikesUsers', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BlogLikesUsers', null, {})
  }
}
