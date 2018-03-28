'use strict'
module.exports = function (sequelize, DataTypes) {
  var HashtagsPosts = sequelize.define('HashtagsPosts', {
    HashtagId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  })
  return HashtagsPosts
}
