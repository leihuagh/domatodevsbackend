'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    // for each of the 10 itineraries
    for (var i = 0; i < 10; i++) {
      for (var j = 1; j <= 10; j++) {
        // each post has 10 media
        // 3 posts per blog. load seq 2, 4,5. 1 and 3 r headers.
        seedArr.push({
          MediumId: j,
          PostId: (3 * i) + 1,
          loadSequence: j,
          caption: `Seeded caption ${j}`,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      seedArr.push({
        MediumId: 1,
        PostId: (3 * i) + 2,
        loadSequence: 1,
        caption: `Seeded caption`,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return queryInterface.bulkInsert('MediaPosts', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MediaPosts', null, {})
  }
}
