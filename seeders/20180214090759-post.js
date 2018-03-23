'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    seedArr.push({
      BlogId: 1,
      loadSequence: 2,
      textContent: 'All Tibetans will require an e-visa to travel to India, unless you are the Domai Lama. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      title: 'e-Visa',
      contentOnly: true
    })
    seedArr.push({
      BlogId: 1,
      loadSequence: 4,
      textContent: 'Seeded Child Post 1',
      contentOnly: false,
      eventType: 'Activity',
      start: true,
      description: 'Seeded Description 1',
      startDay: 1,
      endDay: 1,
      LocationId: 1
    })
    seedArr.push({
      BlogId: 1,
      ParentPostId: 2,
      loadSequence: 5,
      textContent: 'Seeded Child Post 2',
      contentOnly: false,
      eventType: 'Activity',
      start: true,
      description: 'Seeded Description 2',
      startDay: 1,
      endDay: 1,
      LocationId: 1
    })
    return queryInterface.bulkInsert('Posts', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {})
  }
}
