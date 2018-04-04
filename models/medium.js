'use strict'
module.exports = function (sequelize, DataTypes) {
  var Medium = sequelize.define('Medium', {
    AlbumId: DataTypes.INTEGER,
    url: DataTypes.TEXT,
    type: DataTypes.STRING
  })

  Medium.associate = function (models) {
    Medium.belongsTo(models.Album)
    Medium.belongsToMany(models.Post, {
      through: 'MediaPosts'
    })
    Medium.belongsToMany(models.Blog, {
      through: 'MediaBlogs'
    })
  }

  return Medium
}
