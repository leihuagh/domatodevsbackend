const db = require('../connectors')
const _ = require('lodash')

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
    getUserBucketList: async (__, data, context) => {
      // console.log('context', context.user)

      let bucketRows = await db.Bucket.findAll({
        where: {UserId: context.user},
        order: db.sequelize.col('id')
      })

      let allCountryRows = await Promise.all(bucketRows.map(async bucket => {
        let locationRow = await bucket.getLocation()
        return locationRow.getCountry()
      }))

      let uniqueCountryRows = _.uniqBy(allCountryRows, 'id')

      return {
        buckets: bucketRows,
        countries: uniqueCountryRows
      }
    },
    findBucket: (__, data) => {
      return db.Bucket.findById(data.id)
    }
  },
  Mutation: {
    createBucket: (__, data, context) => {
      let UserId = context.user
      let bucketObj = {}
      let fields = ['LocationId', 'bucketCategory', 'eventType', 'notes', 'thumbnailUrl']
      fields.forEach(field => {
        if (field in data) {
          bucketObj[field] = data[field]
        }
      })
      // console.log('bucketObj', bucketObj)
      return db.Bucket.create({
        UserId: UserId,
        visited: false,
        ...bucketObj
      })
    },
    // update bucket cannot change location, only update metadata.
    updateBucket: async (__, data) => {
      let updatesObj = {}
      let fields = ['bucketCategory', 'eventType', 'notes', 'thumbnailUrl', 'visited']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      let foundBucket = await db.Bucket.findById(data.id)
      return foundBucket.update(updatesObj)
    },
    deleteBucket: (__, data) => {
      return db.Bucket.destroy({where: {id: data.id}})
    }
  }
}

module.exports = Bucket
