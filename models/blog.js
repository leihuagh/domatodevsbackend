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
    textContent: DataTypes.TEXT, // draft js json string
    title: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    publishDate: DataTypes.DATE, // js date obj
    views: DataTypes.INTEGER,
    shares: DataTypes.INTEGER,
    days: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  Blog.associate = function (models) {
    Blog.belongsTo(models.User)
    Blog.hasMany(models.BlogHeading)
    Blog.hasMany(models.Post)
    // belongsToMany (join tables)
    Blog.belongsToMany(models.User, {
      as: 'Likes',
      through: 'BlogLikesUsers'
    })
    Blog.belongsToMany(models.Medium, {
      through: 'MediaBlogs'
    })
    Blog.belongsToMany(models.Hashtag, {
      through: 'HashtagsBlogs'
    })
  }

  return Blog
}
