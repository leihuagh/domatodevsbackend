'use strict'
module.exports = function (sequelize, DataTypes) {
  var MediaBlogs = sequelize.define('MediaBlogs', {
    // ZZZ WE HV TO DEFINE PRIMARY KEY HERE AS WELL. ELSE IT DEFAULT TO COMPOSITE MEDIUMID/BLOGID KEY.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    MediumId: DataTypes.INTEGER,
    BlogId: DataTypes.INTEGER,
    loadSequence: DataTypes.INTEGER,
    caption: DataTypes.STRING
  })

  // MediaBlogs.associate = function (models) {
  //   MediaBlogs.belongsTo(models.Medium, {
  //     foreignKey: 'MediumId'
  //   })
  //   MediaBlogs.belongsTo(models.Blog, {
  //     foreignKey: 'BlogId'
  //   })
  // }

  return MediaBlogs
}
