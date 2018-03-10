'use strict'
module.exports = function (sequelize, DataTypes) {
  var BlogHeading = sequelize.define('BlogHeading', {
    BlogId: DataTypes.INTEGER,
    loadSequence: DataTypes.INTEGER,
    title: DataTypes.STRING
  })

  BlogHeading.associate = function (models) {
    BlogHeading.belongsTo(models.Blog)
  }

  return BlogHeading
}
