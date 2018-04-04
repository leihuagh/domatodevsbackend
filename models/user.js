'use strict'
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    CountryId: DataTypes.INTEGER,
    bio: DataTypes.STRING
  })

  User.associate = function (models) {
    User.belongsTo(models.Country)
    User.belongsToMany(models.Itinerary, {through: 'UsersItineraries'})
    User.belongsToMany(models.Blog, {
      as: 'Likes',
      through: 'BlogLikesUsers'
    })
  }

  return User
}
