'use strict'
module.exports = function (sequelize, DataTypes) {
  var MediaPosts = sequelize.define('MediaPosts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    MediumId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
    loadSequence: DataTypes.INTEGER,
    caption: DataTypes.STRING
  })
  return MediaPosts
}
