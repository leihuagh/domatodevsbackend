'use strict'
module.exports = function (sequelize, DataTypes) {
  var Bucket = sequelize.define('Bucket', {
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
    LocationId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Locations'
        },
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.STRING
    },
    eventType: {
      type: DataTypes.STRING
    },
    bucketCategory: {
      type: DataTypes.STRING
    },
    thumbnailUrl: {
      type: DataTypes.STRING
    },
    visited: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })

  Bucket.associate = function (models) {
    Bucket.belongsTo(models.User)
    Bucket.belongsTo(models.Location)
  }

  return Bucket
}
