// NOTE : Posts type imported from types folder

const typeDefs = /* GraphQL */ `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    posts: [Posts!]!
    post(id: ID!): Posts
    postsByCategory(CategoryId: ID!): [Posts!]
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
    CategoryId: ID!
    UserId: ID!
    user: Users
    category: Categories
  }

  type Users {
    id: ID!
    firstname: String!
    lastname: String!
    city: String!
  }

  type Categories {
    id: ID!
    name: String!
  }

  type ResultMessage {
    success: String
  }

  input EditPostInput {
    title: String
    price: Float
    image: String
    CategoryId: ID
    UserId: ID
  }
`

export default typeDefs
