'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('CountriesItineraries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CountryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Countries'
          },
          key: 'id'
        }
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
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('CountriesItineraries')
  }
}
