'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    seedArr.push({
      MediumId: 4,
      BlogId: 1,
      loadSequence: 1,
      caption: 'The Residence of the Domai Lama'
    })
    seedArr.push({
      MediumId: 5,
      BlogId: 1,
      loadSequence: 2,
      caption: 'Domai Lama and his Cow'
    })
    seedArr.push({
      MediumId: 6,
      BlogId: 1,
      loadSequence: 3,
      caption: 'Domai Lama and his Dog'
    })
    return queryInterface.bulkInsert('MediaBlogs', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MediaBlogs', null, {})
  }
}
