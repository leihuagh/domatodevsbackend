const Hashtag = `
  type Hashtag {
    id: ID!
    name: String
    taggedBlogs: [Blog]
    taggedPosts: [Post]
  }

  type HashtagsBlogs {
    id: ID!
    BlogId: ID!
    HashtagId: ID!
  }

  type HashtagsPosts {
    id: ID!
    PostId: ID!
    HashtagId: ID!
  }
`
module.exports = Hashtag
