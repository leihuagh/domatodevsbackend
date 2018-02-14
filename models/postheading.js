'use strict'
module.export = function (sequelize, DataTypes) {
  var PostHeading = sequelize.define('PostHeading', {
    PostId: DataTypes.INTEGER,
    loadSequence: DataTypes.INTEGER,
    content: DataTypes.STRING
  })

  PostHeading.associate = function (models) {
    PostHeading.belongsTo(models.Post)
  }

  return PostHeading
}
