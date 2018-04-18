'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    seedArr.push({
      MediumId: 1,
      BlogId: 1,
      loadSequence: 1,
      caption: 'The Residence of the Domai Lama'
    })
    seedArr.push({
      MediumId: 2,
      BlogId: 1,
      loadSequence: 2,
      caption: 'Domai Lama and his Cow'
    })
    seedArr.push({
      MediumId: 3,
      BlogId: 1,
      loadSequence: 3,
      caption: 'Domai Lama and his Dog'
    })
    return queryInterface.bulkInsert('MediaBlogs', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MediaBlogs', null, {})
  }
}
