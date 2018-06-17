const db = require('../connectors')

const Bucket = {
  Bucket: {
    user (bucket) {
      return bucket.getUser()
    },
    location (bucket) {
      return bucket.getLocation()
    }
  },
  Query: {
    getUserBucketList: (__, data, context) => {
      console.log('context', context.user)
      return db.Bucket.findAll({
        where: {UserId: context.user},
        order: db.sequelize.col('id')
      })
        .then(bucketList => {
          console.log('bucket list arr', bucketList)
          return bucketList
        })
    },
    findBucket: (__, data) => {
      return db.Bucket.findById(data.id)
    }
  },
  Mutation: {
    createBucket: (__, data) => {
      let bucketObj = {}
      let fields = ['LocationId', 'bucketCategory', 'eventType', 'notes', 'thumbnailUrl']
      fields.forEach(field => {
        if (field in data) {
          bucketObj[field] = data[field]
        }
      })
      // console.log('bucketObj', bucketObj)
      return db.Bucket.create({
        UserId: data.UserId,
        visited: false,
        ...bucketObj
      })
    },
    // update bucket cannot change location, only update metadata.
    updateBucket: (__, data) => {
      let updatesObj = {}
      let fields = ['bucketCategory', 'eventType', 'notes', 'thumbnailUrl', 'visited']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      return db.Bucket.findById(data.id)
        .then(found => {
          return found.update(updatesObj)
        })
    },
    deleteBucket: (__, data) => {
      return db.Bucket.destroy({where: {id: data.id}})
    }
  }
}

module.exports = Bucket
