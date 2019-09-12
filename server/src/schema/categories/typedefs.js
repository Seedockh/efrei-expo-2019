import ResultMessage from '../../types/ResultMessage';
import Categories from '../../types/Categories'

const typeDefs = `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    categories: [Categories!]!
    category(id: ID!): Categories
  }

  type Mutation {
    editCategory(id: ID!, data: EditCategoryInput!): Categories!
    createCategory(data: EditCategoryInput!): Categories!
    deleteCategory(id: ID!): ResultMessage!
  }

  # ---

  input EditCategoryInput {
    name: String
  }
`

export default () => [typeDefs, Categories, ResultMessage]
