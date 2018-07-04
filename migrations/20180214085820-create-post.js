'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BlogId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Blogs'
          }
        },
        key: 'id'
      },
      LocationId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Locations'
          }
        },
        key: 'id'
      },
      loadSequence: {
        type: Sequelize.INTEGER
      },
      textContent: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.STRING
      },
      startDay: {
        type: Sequelize.INTEGER
      },
      startTime: {
        type: Sequelize.INTEGER
      },
      endTime: {
        type: Sequelize.INTEGER
      },
      eventType: {
        type: Sequelize.STRING
      },
      bucketCategory: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.FLOAT
      },
      bookingService: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Posts')
  }
}
