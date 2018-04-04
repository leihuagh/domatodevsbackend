'use strict'
module.exports = function (sequelize, DataTypes) {
  var Album = sequelize.define('Album', {
    UserId: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING
    // tags / countries?
  })

  Album.associate = function (models) {
    Album.belongsTo(models.User)
    Album.hasMany(models.Medium)
  }

  return Album
}
