'use strict'
// const countries = require('../data/countries.json')
// const faker = require('faker')
// const bcrypt = require('bcrypt')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var user1 = {
      id: 'auth0|5ab1dce98bd5067ff5786507',
      fullName: 'domatodevs@gmail.com',
      username: 'domatodevs',
      email: 'domatodevs@gmail.com',
      profilePic: 'https://s.gravatar.com/avatar/51e8e59034a4c4e3cc4ae0256c196739?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdo.png',
      // CountryId: 120,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return queryInterface.bulkInsert('Users', [user1], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
