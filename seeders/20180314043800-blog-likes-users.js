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
    // seed likes for 10 blogs
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        BlogId: i, // owner is domatodev
        UserId: 'auth0|5ab4723ded63ab65463ddb7f', // rebecca
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('BlogLikesUsers', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BlogLikesUsers', null, {})
  }
}
