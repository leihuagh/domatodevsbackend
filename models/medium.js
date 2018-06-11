'use strict'
module.exports = function (sequelize, DataTypes) {
  var Medium = sequelize.define('Medium', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    AlbumId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Albums'
        },
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING
    },
    objectName: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.TEXT
    },
    youtubeUrl: {
      type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })

  Medium.associate = function (models) {
    Medium.belongsTo(models.Album)
    Medium.belongsToMany(models.Post, {
      through: 'MediaPosts'
    })
    Medium.belongsToMany(models.Blog, {
      through: 'MediaBlogs'
    })
  }

  return Medium
}
