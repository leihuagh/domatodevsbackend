const db = require('../connectors')
const jwt = require('jsonwebtoken')

const User = {
  User: {
    country (user) {
      return user.getCountry()
    },
    itineraries (user) {
      return user.getItineraries()
    }
  },
  Query: {
    allUsers: () => {
      return db.User.findAll()
    },
    findUser: (__, data) => {
      console.log('data received', data)
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
    onAuth0UserAuthentication: (__, data, context) => {
      // console.log('onAuth0UserAuthentication', data)
      console.log('context.user', context.user)
      if (!context.user) {
        console.log('access token is invalid')
        return
      }

      // NEED TO VERIFY NOT DECODE.
      var idTokenClaims = jwt.decode(data.idToken)
      // console.log('idTokenClaims', idTokenClaims)
      var newUser = {
        id: idTokenClaims.sub,
        fullName: idTokenClaims.name, // can be name stored in Auth0 or just the email address associated with it.
        username: idTokenClaims.nickname,
        profilePic: idTokenClaims.picture,
        email: idTokenClaims.email
      }
      console.log('newUser', newUser)
      // find or create users
      return db.User.findCreateFind({
        where: {id: newUser.id},
        defaults: newUser
      })
        .then(results => {
          // console.log('results', results)
          return results[0]
        })
    },
    updateUserProfile: (__, data, context) => {
      console.log('data received', data)
      console.log('context.user', context.user)
      if (!context.user) {
        console.log('access token is invalid')
        return null
      }
      let updatesObj = {}
      let fields = ['profilePic', 'fullName', 'CountryId', 'bio']
      fields.forEach(field => {
        if (data.hasOwnProperty(field)) {
          updatesObj[field] = data[field]
        }
      })
      console.log('updatesObj', updatesObj)
      return db.User.findById(context.user)
        .then(foundUser => {
          return foundUser.update(updatesObj)
            .then(updated => {
              console.log('updated', updated)
              return updated
            })
        })
    }
  }
}

module.exports = User
