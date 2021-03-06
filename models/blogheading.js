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
      },
      allowNull: true,
      hooks: true,
      onDelete: 'CASCADE'
    },
    loadSequence: DataTypes.INTEGER,
    title: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  BlogHeading.associate = function (models) {
    BlogHeading.belongsTo(models.Blog)
    BlogHeading.belongsTo(models.Medium, {onDelete: 'CASCADE', hooks: true})
  }

  return BlogHeading
}
