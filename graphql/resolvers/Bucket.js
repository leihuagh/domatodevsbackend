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
    getUserBucketList: (__, data, context) => {
      console.log('context', context.user)
      return db.Bucket.findAll({
        where: {UserId: context.user},
        order: db.sequelize.col('id')
      })
        .then(bucketRows => {
          // console.log('bucket rows', bucketRows)

          let countryRows = []
          bucketRows.forEach(bucket => {
            let countryRow = bucket.getLocation()
              .then(locationRow => {
                // console.log('locationRow', locationRow)
                return locationRow.getCountry()
              })
            countryRows.push(countryRow)
          })

          return Promise.all(countryRows)
            .then(unfilteredRows => {
              let uniqueRows = _.uniqBy(unfilteredRows, 'id')
              console.log('uniqueRows', uniqueRows)
              return {
                buckets: bucketRows,
                countries: uniqueRows
              }
            })
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
