'use strict'
module.exports = function (sequelize, DataTypes) {
  var Blog = sequelize.define('Blog', {
    UserId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER,
    textContent: DataTypes.TEXT,
    title: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    views: DataTypes.INTEGER,
    shares: DataTypes.INTEGER
  })

  Blog.associate = function (models) {
    Blog.belongsTo(models.User)
    Blog.hasMany(models.BlogHeading)
    Blog.hasMany(models.Post)
    Blog.belongsToMany(models.User, {
      as: 'Likes',
      through: 'BlogLikesUsers'
    })
  }

  return Blog
}
