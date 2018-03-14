'use strict'
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    CountryId: DataTypes.INTEGER,
    profilePic: DataTypes.STRING,
    password: DataTypes.STRING
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
