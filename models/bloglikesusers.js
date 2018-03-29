'use strict'
module.exports = function (sequelize, DataTypes) {
  var BlogLikesUsers = sequelize.define('BlogLikesUsers', {
    BlogId: DataTypes.INTEGER,
    UserId: DataTypes.STRING
  })
  return BlogLikesUsers
}
