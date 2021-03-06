'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'Users'
          }
        },
        key: 'id'
      },
      ItineraryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Itineraries'
          },
          key: 'id'
        }
      },
      // textContent: {
      //   type: Sequelize.TEXT
      // },
      title: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      publishDate: {
        type: Sequelize.DATE
      },
      views: {
        type: Sequelize.INTEGER
      },
      shares: {
        type: Sequelize.INTEGER
      },
      days: {
        type: Sequelize.INTEGER
      },
      MediumId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Media'
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

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Blogs')
  }
}
