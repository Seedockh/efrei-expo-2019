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
    login(data: LoginInput!): Users!
  }

  type Mutation {
    createUser(data: EditUserInput!): Users!
    editUser(id: ID!, data: EditUserInput!): Users!
    deleteUser(id: ID!): ResultMessage!
  }

  # ---

  input LoginInput {
    firstname: String
    lastname: String
  }

  input EditUserInput {
    firstname: String
    lastname: String
    city: String
  }
`

export default () => [typeDefs, Users, ResultMessage];
