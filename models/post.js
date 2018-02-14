'use strict'
module.export = function (sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    UserId: DataTypes.INTEGER,
    ItineraryId: DataTypes.INTEGER
  })

  Post.associate = function (models) {
    Post.belongsTo(models.User)
    Post.hasMany(models.PostHeading)
    Post.hasMany(models.Event)
  }

  return Post
}
