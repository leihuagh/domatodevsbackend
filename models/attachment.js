'use strict'
module.exports = function (sequelize, DataTypes) {
  var Attachment = sequelize.define('Attachment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      hooks: true,
      onDelete: 'CASCADE',
      references: {
        model: {
          tableName: 'Events'
        },
        key: 'id'
      }
    },
    fileName: DataTypes.STRING, // object name in GCP
    fileAlias: DataTypes.STRING, // name of file on user's computer
    fileType: DataTypes.STRING,
    fileSize: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  Attachment.associate = function (models) {
    Attachment.belongsTo(models.Event, {onDelete: 'CASCADE', hooks: true})
  }

  return Attachment
}
