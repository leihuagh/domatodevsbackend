'use strict'
module.exports = function (sequelize, DataTypes) {
  var BlogLikesUsers = sequelize.define('BlogLikesUsers', {
    BlogId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Blogs'
        },
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.STRING,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })
  return BlogLikesUsers
}
