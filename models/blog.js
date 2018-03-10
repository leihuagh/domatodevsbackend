'use strict'
module.exports = function (sequelize, DataTypes) {
  var Blog = sequelize.define('Blog', {
    UserId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    textContent: DataTypes.TEXT,
    title: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  })

  Blog.associate = function (models) {
    Blog.belongsTo(models.User)
    Blog.hasMany(models.BlogHeading)
    Blog.hasMany(models.Post)
  }

  return Blog
}
