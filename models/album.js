'use strict'
module.exports = function (sequelize, DataTypes) {
  var Album = sequelize.define('Album', {
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
        },
        key: 'id'
      }
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    // tags / countries?
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  Album.associate = function (models) {
    Album.belongsTo(models.User)
    Album.hasMany(models.Medium)
  }

  return Album
}
