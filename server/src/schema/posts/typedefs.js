import ResultMessage from '../../types/ResultMessage';
import Posts from '../../types/Posts'

const typeDefs = `
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

  input EditPostInput {
    title: String
    price: Float
    image: String
    CategoryId: ID
    UserId: ID
  }
`

export default () => [typeDefs, Posts, ResultMessage];
