'use strict'
module.exports = function (sequelize, DataTypes) {
  var HashtagsPosts = sequelize.define('HashtagsPosts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    HashtagId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  })
  return HashtagsPosts
}
