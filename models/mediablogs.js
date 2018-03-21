'use strict'
module.exports = function (sequelize, DataTypes) {
  var MediaBlogs = sequelize.define('MediaBlogs', {
    MediumId: DataTypes.INTEGER,
    BlogId: DataTypes.INTEGER,
    loadSequence: DataTypes.INTEGER,
    caption: DataTypes.STRING
  })
  return MediaBlogs
}
