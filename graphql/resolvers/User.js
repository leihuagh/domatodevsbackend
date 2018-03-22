const db = require('../connectors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const fetch = require('node-fetch')
const request = require('request')

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
    // createUser: (__, data) => {
    //   var hash = bcrypt.hashSync(data.password, 10)
    //   const newUser = {
    //     name: data.name,
    //     email: data.email,
    //     CountryId: data.CountryId,
    //     password: hash
    //   }
    //   return db.User.create(newUser)
    // },
    // updateUser: (__, data) => {
    //   return db.User.findById(data.id)
    //     .then((found) => {
    //       return found.update({
    //         name: data.name,
    //         email: data.email,
    //         password: data.password
    //       })
    //     })
    //     .then(updated => {
    //       return updated
    //     })
    // },
    // deleteUser: (__, data) => {
    //   return db.User.destroy({where: {id: data.id}})
    //     .then(status => {
    //       return status
    //     })
    // },
    // createToken: (__, data) => {
    //   console.log('data', data)
    //   return db.User.findOne({
    //     where: {email: data.email}
    //   })
    //     .then(found => {
    //       return bcrypt.compare(data.password, found.password)
    //         .then(compared => {
    //           if (compared) {
    //             var token = jwt.sign({id: found.id, email: found.email}, process.env.JWT)
    //             console.log('jwt', process.env.JWT)
    //             console.log('token')
    //             return token
    //           } else {
    //             return 'unauthorized. password incorrect'
    //           }
    //         })
    //     })
    //     .catch(err => {
    //       console.log('err', err)
    //       return err
    //     })
    // },
    onAuth0UserAuthentication: (__, data) => {
      // console.log('onAuth0UserAuthentication', data)
      var idTokenClaims = jwt.decode(data.idToken)
      // console.log('idTokenClaims', idTokenClaims)
      var newUser = {
        id: idTokenClaims.sub,
        fullName: idTokenClaims.name, // can be name stored in Auth0 or just the email address associated with it.
        username: idTokenClaims.nickname,
        profilePic: idTokenClaims.picture,
        email: idTokenClaims.email
      }
      // console.log('newUser', newUser)
      // find or create users
      return db.User.findCreateFind({
        where: {id: newUser.id},
        defaults: newUser
      })
        .then(results => {
          return results[0]
        })

      // exchange credentials with user management api
      // fetch(`https://domatodevs.auth0.com/oauth/token`, {
      //   headers: {'content-type': 'application/json'},
      //   body: '{"client_id":"***","client_secret":"***","audience":"https://domatodevs.auth0.com/api/v2/","grant_type":"client_credentials"}'
      // })
      //   .then(response => {
      //     // console.log('response body', response.body)
      //     return response.body
      //   })
      //   .catch(err => {
      //     console.log('err', err)
      //   })

      // var options = { method: 'POST',
      //   url: 'https://domatodevs.auth0.com/oauth/token',
      //   headers: { 'content-type': 'application/json', json: true },
      //   body: '{"client_id":"***","client_secret":"***","audience":"http://localhost:3001","grant_type":"client_credentials"}' }
      //
      // request(options, function (error, response, body) {
      //   if (error) throw new Error(error)
      //
      //   // console.log('body', body)
      //   // console.log('json', JSON.parse(body))
      //   var json = JSON.parse(body)
      //   // var accessToken = json.access_token
      //   console.log('accessToken', accessToken)
      // })
    }
  }
}

module.exports = User
