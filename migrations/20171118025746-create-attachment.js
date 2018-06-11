'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EventId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        hooks: true,
        references: {
          model: {
            tableName: 'Events'
          },
          key: 'id'
        }
      },
      fileName: {
        type: Sequelize.STRING
      },
      fileAlias: {
        type: Sequelize.STRING
      },
      fileType: {
        type: Sequelize.STRING
      },
      fileSize: {
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
    return queryInterface.dropTable('Attachments')
  }
}
