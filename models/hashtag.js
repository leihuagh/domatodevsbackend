'use strict'
module.exports = function (sequelize, DataTypes) {
  var Hashtag = sequelize.define('Hashtag', {
    name: DataTypes.STRING
  })

  Hashtag.associate = function (models) {
    Hashtag.belongsToMany(models.Post, {
      through: 'HashtagsPosts'
    })
    Hashtag.belongsToMany(models.Blog, {
      through: 'HashtagsBlogs'
    })
  }

  return Hashtag
}
