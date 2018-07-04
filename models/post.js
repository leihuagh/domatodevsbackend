'use strict'

module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    BlogId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Blogs'
        }
      },
      key: 'id'
    },
    LocationId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Locations'
        }
      },
      key: 'id'
    },
    loadSequence: {
      type: DataTypes.INTEGER
    },
    textContent: {
      type: DataTypes.TEXT
    },
    title: {
      type: DataTypes.STRING
    },
    startDay: {
      type: DataTypes.INTEGER
    },
    startTime: {
      type: DataTypes.INTEGER
    },
    endTime: {
      type: DataTypes.INTEGER
    },
    eventType: {
      type: DataTypes.STRING
    },
    bucketCategory: {
      type: DataTypes.STRING
    }, // only if there is Location
    currency: {
      type: DataTypes.STRING
    },
    cost: {
      type: DataTypes.FLOAT
    },
    bookingService: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })

  Post.associate = function (models) {
    Post.belongsTo(models.Blog)
    Post.belongsTo(models.Location)
    Post.belongsToMany(models.Medium, {
      through: 'MediaPosts'
    })
    Post.belongsToMany(models.Hashtag, {
      through: 'HashtagsPosts'
    })
  }

  return Post
}
