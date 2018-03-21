'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    // var seedArr = []
    // seedArr.push({
    //   MediumId: 1,
    //   PostId: 1,
    //   loadSequence: 1,
    //   caption: 'The Residence of the Domai Lama'
    // })
    // seedArr.push({
    //   MediumId: 2,
    //   PostId: 1,
    //   loadSequence: 2,
    //   caption: 'Domai Lama and his Cow'
    // })
    // seedArr.push({
    //   MediumId: 3,
    //   PostId: 1,
    //   loadSequence: 3,
    //   caption: 'Domai Lama and his Dog'
    // })
    // seedArr.push({
    //   MediumId: 4,
    //   PostId: 1,
    //   loadSequence: 4,
    //   caption: 'Domai Lama and his Elephant'
    // })
    // seedArr.push({
    //   MediumId: 5,
    //   PostId: 1,
    //   loadSequence: 5,
    //   caption: 'Domai Lama and his Mother'
    // })
    // seedArr.push({
    //   MediumId: 6,
    //   PostId: 1,
    //   loadSequence: 6,
    //   caption: 'Domai Lama\'s Birthplace'
    // })
    // return queryInterface.bulkInsert('MediaPosts', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MediaPosts', null, {})
  }
}
