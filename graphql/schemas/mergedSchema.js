// importing and merging separate schema files
const { makeExecutableSchema } = require('graphql-tools')

const mergedResolvers = require('../resolvers/mergedResolvers')

const Query = require('./Query')
const Mutation = require('./Mutation')

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`
const Input = require('./Input')
const Country = require('./Country')
const User = require('./User')
const Itinerary = require('./Itinerary')
const Location = require('./Location')
const Event = require('./Event')
const Attachment = require('./Attachment')
const Blog = require('./Blog')
const BlogHeading = require('./BlogHeading')
const Post = require('./Post')
const BlogPage = require('./BlogPage')
const Album = require('./Album')
const Medium = require('./Medium')
const MediaObject = require('./MediaObject')
const Hashtag = require('./Hashtag')
const Bucket = require('./Bucket')

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, Mutation, Input, Country, User, Itinerary, Location, Event, Attachment, Event, Blog, BlogHeading, Post, BlogPage, Album, Medium, MediaObject, Hashtag, Bucket],
  resolvers: mergedResolvers
})
