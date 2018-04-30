'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        MediumId: 1,
        BlogId: i,
        loadSequence: 1,
        caption: 'The Residence of the Domai Lama'
      })
      seedArr.push({
        MediumId: 2,
        BlogId: i,
        loadSequence: 2,
        caption: 'Domai Lama and his Cow'
      })
      seedArr.push({
        MediumId: 3,
        BlogId: i,
        loadSequence: 3,
        caption: 'Domai Lama and his Dog'
      })
    }
    return queryInterface.bulkInsert('MediaBlogs', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MediaBlogs', null, {})
  }
}
