'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    seedArr.push({
      name: 'Thailand'
    })
    seedArr.push({
      name: 'Food'
    })
    seedArr.push({
      name: '2018'
    })
    return queryInterface.bulkInsert('Hashtags', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hashtags', null, {})
  }
}
