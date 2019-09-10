import ResultMessage from '../../types/ResultMessage';
import Users from '../../types/Users';

const typeDefs = `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    users: [Users!]!
    user(id: ID!): Users!
  }

  type Mutation {
    editUser(id: ID!, data: EditUserInput!): Users!
    createUser(data: EditUserInput!): Users!
    deleteUser(id: ID!): ResultMessage!
  }

  # ---

  input EditUserInput {
    firstname: String
    lastname: String
    city: String
  }
`

export default () => [typeDefs, Users, ResultMessage];
