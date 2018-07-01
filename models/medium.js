'use strict'
module.exports = function (sequelize, DataTypes) {
  var Medium = sequelize.define('Medium', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    AlbumId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Albums'
        },
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING
    },
    objectName: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.TEXT
    },
    youtubeUrl: {
      type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })

  Medium.associate = function (models) {
    Medium.belongsTo(models.Album)
    Medium.hasMany(models.Blog)
    Medium.hasMany(models.BlogHeading)
    Medium.belongsToMany(models.Post, {
      through: 'MediaPosts'
    })
  }

  Medium.beforeDestroy((instance, options) => {
    console.log('MEDIUM BEFORE DESTROY HOOK')
    // set null on blog, blog headings
    let removeForeignKeyFromBlogs = sequelize.models.Blog.findAll({where: {
      MediumId: instance.id
    }})
      .then(foundBlogs => {
        let updateBlogPromiseArr = []
        foundBlogs.forEach(blog => {
          let updatePromise = blog.update({MediumId: null})
          updateBlogPromiseArr.push(updatePromise)
        })
        return Promise.all(updateBlogPromiseArr)
      })
    let removeForeignKeyFromBlogHeadings = sequelize.models.BlogHeading.findAll({where: {
      MediumId: instance.id
    }})
      .then(foundHeadings => {
        let updateHeadingsPromiseArr = []
        foundHeadings.forEach(heading => {
          let updatePromise = heading.update({MediumId: null})
          updateHeadingsPromiseArr.push(updatePromise)
        })
        return Promise.all(updateHeadingsPromiseArr)
      })
    return Promise.all([removeForeignKeyFromBlogs, removeForeignKeyFromBlogHeadings])
  })

  return Medium
}
