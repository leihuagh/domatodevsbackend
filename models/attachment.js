'use strict'
module.exports = function (sequelize, DataTypes) {
  var Attachment = sequelize.define('Attachment', {
    EventId: DataTypes.INTEGER,
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
