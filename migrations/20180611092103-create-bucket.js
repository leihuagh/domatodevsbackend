'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Buckets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
      LocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Locations'
          },
          key: 'id'
        }
      },
      notes: {
        type: Sequelize.STRING
      },
      eventType: {
        type: Sequelize.STRING
      },
      bucketCategory: {
        type: Sequelize.STRING
      },
      thumbnailUrl: {
        type: Sequelize.STRING
      },
      visited: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Buckets')
  }
}
