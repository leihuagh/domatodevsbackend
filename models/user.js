'use strict'
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    profilePic: {
      type: DataTypes.STRING
    },
    CountryId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Countries'
        },
        key: 'id'
      }
    },
    bio: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  })

  User.associate = function (models) {
    User.belongsTo(models.Country)
    User.belongsToMany(models.Itinerary, {through: 'UsersItineraries'})
    User.hasMany(models.Album)
    User.hasMany(models.Blog)
    // join table
    User.belongsToMany(models.Blog, {
      as: 'Likes',
      through: 'BlogLikesUsers'
    })
    User.hasMany(models.Bucket)
  }

  return User
}
