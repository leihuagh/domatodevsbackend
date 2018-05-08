const _ = require('lodash')

const User = require('./User')
const Country = require('./Country')
const Location = require('./Location')
const Itinerary = require('./Itinerary')
const Event = require('./Event')

const LoadSequence = require('./LoadSequence')
const Attachment = require('./Attachment')
const DeleteMultipleEvents = require('./DeleteMultipleEvents')
const Blog = require('./Blog')
const BlogHeading = require('./BlogHeading')
const Post = require('./Post')
const Album = require('./Album')
const Medium = require('./Medium')
const ReorderBlogContent = require('./ReorderBlogContent')
const Hashtag = require('./Hashtag')

const resolvers = _.merge(User, Country, Location, Itinerary, Event, LoadSequence, Attachment, DeleteMultipleEvents, Blog, BlogHeading, Post, Album, Medium, ReorderBlogContent, Hashtag)

module.exports = resolvers
