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
    loadSequence: DataTypes.INTEGER,
    title: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  BlogHeading.associate = function (models) {
    BlogHeading.belongsTo(models.Blog)
  }

  return BlogHeading
}
