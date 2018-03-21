'use strict'
module.exports = function (sequelize, DataTypes) {
  var Medium = sequelize.define('Medium', {
    url: DataTypes.TEXT,
    type: DataTypes.STRING
  })

  Medium.associate = function (models) {
    Medium.belongsToMany(models.Post, {
      through: 'MediaPosts'
    })
    Medium.belongsToMany(models.Blog, {
      through: 'MediaBlogs'
    })
  }

  return Medium
}
