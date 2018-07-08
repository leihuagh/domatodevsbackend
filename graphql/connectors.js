require('dotenv').config()
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.js')[env]

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  })
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

var db = {
  Country: sequelize.import('../models/country'),
  User: sequelize.import('../models/user'),
  Itinerary: sequelize.import('../models/itinerary'),
  UsersItineraries: sequelize.import('../models/usersitineraries'),
  CountriesItineraries: sequelize.import('../models/countriesitineraries'),
  Location: sequelize.import('../models/location'),
  Event: sequelize.import('../models/event'),
  Attachment: sequelize.import('../models/attachment'),
  Blog: sequelize.import('../models/blog'),
  BlogHeading: sequelize.import('../models/blogheading'),
  Post: sequelize.import('../models/post'),
  BlogLikesUsers: sequelize.import('../models/bloglikesusers'),
  Album: sequelize.import('../models/album'),
  Medium: sequelize.import('../models/medium'),
  MediaPosts: sequelize.import('../models/mediaposts'),
  Hashtag: sequelize.import('../models/hashtag'),
  HashtagsBlogs: sequelize.import('../models/hashtagsblogs'),
  HashtagsPosts: sequelize.import('../models/hashtagsposts'),
  Bucket: sequelize.import('../models/bucket')
}

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

// console.log('sequelize models', db.sequelize.models)
sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize has connected to db')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = db
