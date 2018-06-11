'use strict'
module.exports = function (sequelize, DataTypes) {
  var HashtagsBlogs = sequelize.define('HashtagsBlogs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    HashtagId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Hashtags'
        },
        key: 'id'
      }
    },
    BlogId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Blogs'
        },
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })
  return HashtagsBlogs
}
