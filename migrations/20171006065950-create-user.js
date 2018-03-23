'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      // CountryId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: {
      //       tableName: 'Countries'
      //     },
      //     key: 'id'
      //   }
      // },
      profilePic: {
        type: Sequelize.STRING
      },
      // password: {
      //   allowNull: false,
      //   type: Sequelize.STRING
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users')
  }
}
