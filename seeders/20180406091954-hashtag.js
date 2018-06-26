'use strict'
// const faker = require('faker')

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
    seedArr.push({
      name: 'Adventure'
    })
    seedArr.push({
      name: 'Korea'
    })
    seedArr.push({
      name: 'Japan'
    })
    return queryInterface.bulkInsert('Hashtags', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hashtags', null, {})
  }
}
