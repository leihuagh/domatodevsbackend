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
    // faker.seed(123)
    // let counter = 0
    // while (counter < 10000) {
    //   // let faked = faker.fake('{{address.cityPrefix}}{{address.citySuffix}}{{address.streetSuffix}}{{commerce.department}}{{commerce.productAdjective}}{{commerce.productAdjective}}{{commerce.productAdjective}}{{commerce.productMaterial}}{{commerce.productMaterial}}{{address.county}}')
    //   seedArr.push({name: faker.random.uuid()})
    //   counter++
    // }
    return queryInterface.bulkInsert('Hashtags', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hashtags', null, {})
  }
}
