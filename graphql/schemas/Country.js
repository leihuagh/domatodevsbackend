const Country = `
  type Country {
    id: ID!
    name: String!
    code: String!
    locations: [Location]
  }
`
module.exports = Country
