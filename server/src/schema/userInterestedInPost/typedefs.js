import ResultMessage from '../../types/ResultMessage';
import Users from '../../types/Users'
import UserInterestedInPost from '../../types/UserInterestedInPost'

const typeDefs = `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    interests: [UserInterestedInPost!]!
    interest(id: ID!): UserInterestedInPost
    interestsByUser(UserId: ID!): [UserInterestedInPost!]
  }

  type Mutation {
    createInterest(data: EditInterest!): UserInterestedInPost!
    editInterest(id: ID!, data: EditInterest!): UserInterestedInPost!
    deleteInterest(id: ID!): ResultMessage!
  }

  # ---

  input EditInterest {
    notificationSent: Boolean
    UserId: ID!
    PostId: ID!
  }
`

export default () => [typeDefs, UserInterestedInPost, Users, ResultMessage];
