'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BlogLikesUsers', {
      BlogId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Blogs'
          },
          key: 'id'
        }
      },
      UserId: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BlogLikesUsers')
  }
}
