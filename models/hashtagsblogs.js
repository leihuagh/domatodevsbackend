'use strict'
module.exports = function (sequelize, DataTypes) {
  var HashtagsBlogs = sequelize.define('HashtagsBlogs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    HashtagId: DataTypes.INTEGER,
    BlogId: DataTypes.INTEGER
  })
  return HashtagsBlogs
}
