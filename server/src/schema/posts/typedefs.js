// NOTE : Posts type imported from types folder

const typeDefs = /* GraphQL */ `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    posts: [Posts!]!
    post(id: ID!): Posts
  }

  type Mutation {
    editPost(id: ID!, data: EditPostInput!): Posts!
    createPost(data: EditPostInput!): Posts!
    deletePost(id: ID!): ResultMessage!
  }

  # ---

  type Posts {
    id: ID!
    title: String!
    price: Float!
    image: String!
  }

  type ResultMessage {
    success: String
  }

  input EditPostInput {
    title: String
    price: Float
    image: String
  }
`

export default typeDefs
