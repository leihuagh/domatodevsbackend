'use strict'
module.exports = function (sequelize, DataTypes) {
  var HashtagsPosts = sequelize.define('HashtagsPosts', {
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
    PostId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Posts'
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
  return HashtagsPosts
}
