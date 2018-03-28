'use strict'

// EVENT REFERS TO EVENT IN A BLOGPOST. NOT ITINERARY
module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    BlogId: DataTypes.INTEGER,
    ParentPostId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER,
    loadSequence: DataTypes.INTEGER,
    textContent: DataTypes.TEXT,
    title: DataTypes.STRING,
    contentOnly: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    start: DataTypes.BOOLEAN,
    startDay: DataTypes.INTEGER,
    endDay: DataTypes.INTEGER,
    eventType: DataTypes.STRING
  })

  Post.associate = function (models) {
    Post.belongsTo(models.Blog)
    Post.belongsTo(models.Location)
    Post.belongsTo(models.Post, {
      as: 'ParentPost'
    })
    Post.hasMany(models.Post, {
      as: 'ChildPosts',
      foreignKey: 'ParentPostId'
    })
    Post.belongsToMany(models.Medium, {
      through: 'MediaPosts'
    })
    Post.belongsToMany(models.Hashtag, {
      through: 'HashtagsPosts'
    })
    // Post.hasMany(models.Attachment)
  }

  return Post
}
