// NOTE : Users type imported from types folder

const typeDefs = /* GraphQL */ `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    users: [Users!]!
    user(id: ID!): Users
  }

  type Mutation {
    editUser(id: ID!, data: EditUserInput!): ResultMessage!
    createUser(data: EditUserInput!): ResultMessage!
    deleteUser(id: ID!): ResultMessage!
  }

  # ---

  type Users {
    id: ID!
    firstname: String!
    lastname: String!
    city: String!
  }

  type ResultMessage {
    success: String
    error: String
  }

  input EditUserInput {
    firstname: String
    lastname: String
    city: String
  }
`

export default typeDefs
