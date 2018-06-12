'use strict'
module.exports = function (sequelize, DataTypes) {
  var BlogHeading = sequelize.define('BlogHeading', {
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
    MediumId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Media'
        },
        key: 'id'
      }
    },
    caption: DataTypes.STRING,
    loadSequence: DataTypes.INTEGER,
    title: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  BlogHeading.associate = function (models) {
    BlogHeading.belongsTo(models.Blog)
    BlogHeading.belongsTo(models.Medium)
  }

  return BlogHeading
}
