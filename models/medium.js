'use strict'
module.exports = function (sequelize, DataTypes) {
  var Medium = sequelize.define('Medium', {
    AlbumId: DataTypes.INTEGER,
    type: DataTypes.STRING, // 'Photo' or 'Youtube',
    // objectName: DataTypes.STRING,
    imageUrl: DataTypes.TEXT, // either photo url in storage, or youtube thumbnail
    youtubeUrl: DataTypes.TEXT // full embed url
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
