const db = require('../connectors')
const jwt = require('jsonwebtoken')

const User = {
  User: {
    country (user) {
      return user.getCountry()
    },
    itineraries (user) {
      return user.getItineraries()
    },
    albums (user) {
      return user.getAlbums()
    },
    blogs (user) {
      return user.getBlogs()
    }
  },
  Query: {
    allUsers: () => {
      return db.User.findAll()
    },
    findUser: (__, data) => {
      return db.User.findById(data.id)
    },
    getUserProfile: (__, data, context) => {
      // pull out user row for profile page
      console.log('data', data, 'context', context)
      return db.User.findById(context.user)
    },
    authorization: (__, data, context) => {
      if (context.user) {
        return true
      } else {
        return false
      }
    }
  },
  Mutation: {
    onAuth0UserAuthentication: async (__, data, context) => {
      // console.log('onAuth0UserAuthentication', data)
      console.log('context.user', context.user)
      if (!context.user) {
        console.log('access token is invalid')
        return
      }

      // NEED TO VERIFY NOT DECODE.
      let idTokenClaims = jwt.decode(data.idToken)

      // name stored in Auth0 defaults to email address or actual name.
      // left is original obj, right is renamed field
      let {sub: id, name: fullName, nickname: username, picture: profilePic, email} = idTokenClaims

      let newUser = {id, fullName, username, profilePic, email}

      console.log('newUser', newUser)

      let userResult = await db.User.findCreateFind({
        where: {id: newUser.id},
        defaults: newUser
      })
      console.log('userResult', userResult)
      return userResult[0]
    },
    updateUserProfile: async (__, data, context) => {
      // console.log('data received', data)
      // console.log('context.user', context.user)
      if (!context.user) {
        console.log('access token is invalid')
        return null
      }
      let updatesObj = {}
      let fields = ['profilePic', 'fullName', 'CountryId', 'bio']
      fields.forEach(field => {
        if (field in data) {
          updatesObj[field] = data[field]
        }
      })
      console.log('updatesObj', updatesObj)

      let foundUser = await db.User.findById(context.user)
      let updatedUser = await foundUser.update(updatesObj)

      console.log('updated', updatedUser)
      return updatedUser
    }
  }
}

module.exports = User
