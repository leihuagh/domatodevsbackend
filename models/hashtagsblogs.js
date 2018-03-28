'use strict'
module.exports = function (sequelize, DataTypes) {
  var HashtagsBlogs = sequelize.define('HashtagsBlogs', {
    HashtagId: DataTypes.INTEGER,
    BlogId: DataTypes.INTEGER
  })
  return HashtagsBlogs
}
