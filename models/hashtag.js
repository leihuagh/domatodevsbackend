'use strict'
module.exports = function (sequelize, DataTypes) {
  var Hashtag = sequelize.define('Hashtag', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })

  Hashtag.associate = function (models) {
    Hashtag.belongsToMany(models.Post, {
      through: 'HashtagsPosts'
    })
    Hashtag.belongsToMany(models.Blog, {
      through: 'HashtagsBlogs'
    })
  }

  return Hashtag
}
