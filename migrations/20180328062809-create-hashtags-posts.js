'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HashtagsPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HashtagId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Hashtags'
          },
          key: 'id'
        }
      },
      PostId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Posts'
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
    return queryInterface.dropTable('HashtagsPosts')
  }
}
