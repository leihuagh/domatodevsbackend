'use strict'
module.exports = function (sequelize, DataTypes) {
  var MediaPosts = sequelize.define('MediaPosts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    MediumId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Media'
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
    loadSequence: {
      type: DataTypes.INTEGER
    },
    caption: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })

  // MediaPosts.associate = function (models) {
  //   MediaPosts.belongsTo(models.Post)
  //   MediaPosts.belongsTo(models.Medium)
  // }

  return MediaPosts
}
