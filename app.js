require('dotenv').config()
const express = require('express')
// const os = require('os')

const cors = require('cors')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')

const schema = require('./graphql/schemas/mergedSchema')

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const app = express()

// only allow front end server to access
// const corsOptions = {
//   origin: ['http://localhost:3000']
// }

// app.use(cors(corsOptions))

app.use(cors())

// app.post('/graphql', function (req, res) {
//   console.log('REQUEST', req)
//   res.send('endpoint hit')
// })
app.use('/', bodyParser.json())
// app.use('/graphql', bodyParser.json())

// app.post('/', function (req, res) {
//   console.log('BACKEND REQ', req.body)
//   res.send('HELLO')
// })

function insertNewlines (certificate) {
  for (var i = 64; i < certificate.length; i += 65) {
    certificate = certificate.slice(0, i) + '\n' + certificate.slice(i)
  }
  return certificate
}

function addBoundaries (certificate) {
  return '-----BEGIN CERTIFICATE-----\n' + certificate + '\n-----END CERTIFICATE-----'
}

function getPEM (certificate) {
  certificate = insertNewlines(certificate)
  certificate = addBoundaries(certificate)
  return certificate
}

function verifyAuth0Token (req, res, next) {
  // console.log('headers', req.headers.authorization)
  const jwks = require('./auth0jwks.json')
  // console.log('jwks', jwks)

  // obtain x5c certificate chain from jwk obj
  var key = jwks.keys[0]
  var certificate = key.x5c[0]
  var pem = getPEM(certificate)
  // console.log('pem', pem)

  var accessToken = req.headers.authorization.substring(7)
  jwt.verify(accessToken, pem, {
    audience: 'http://localhost:3001',
    issuer: 'https://domatodevs.auth0.com/',
    ignoreExpiration: false,
    algorithms: ['RS256']}, function (err, payload) {
    if (err) {
      console.log('ACCESS TOKEN MISSING OR NOT VALID')
    }
    if (payload) {
      console.log('payload', payload)
      // attach unique userid to request and pass it on to resolvers.
      req.user = payload.sub
    }
  })
  next()
}

app.use('/graphql', verifyAuth0Token)

// PASS AUTH0 USERID INTO CONTEXT
app.use('/graphql', graphqlExpress(req => ({
  schema: schema,
  context: {
    user: req.user
  }
})))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

const port = process.env.PORT || 3001
app.listen(port, function () {
  console.log(`Graphql is running on port ${port}`)
})

// var networkInterfaces = os.networkInterfaces()
// console.log('ip address', networkInterfaces)
