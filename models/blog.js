'use strict'
module.exports = function (sequelize, DataTypes) {
  var Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    UserId: {
      type: DataTypes.STRING,
      references: {
        model: {
          tableName: 'Users'
        }
      },
      key: 'id'
    },
    ItineraryId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Itineraries'
        },
        key: 'id'
      }
    },
    // textContent: DataTypes.TEXT, // draft js json string
    title: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    publishDate: DataTypes.DATE, // js date obj
    views: DataTypes.INTEGER,
    shares: DataTypes.INTEGER,
    days: DataTypes.INTEGER,
    MediumId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Media'
        },
        key: 'id'
      },
      allowNull: true,
      hooks: true,
      onDelete: 'CASCADE'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  Blog.associate = function (models) {
    Blog.belongsTo(models.User)
    Blog.belongsTo(models.Itinerary)

    Blog.hasMany(models.BlogHeading)
    Blog.hasMany(models.Post)
    Blog.belongsTo(models.Medium, {onDelete: 'CASCADE', hooks: true})
    // belongsToMany (join tables)
    Blog.belongsToMany(models.User, {
      as: 'Likes',
      through: 'BlogLikesUsers'
    })
    Blog.belongsToMany(models.Hashtag, {
      through: 'HashtagsBlogs'
    })
  }

  return Blog
}
