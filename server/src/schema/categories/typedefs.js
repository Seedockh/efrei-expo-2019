// NOTE : Categories type imported from types folder

const typeDefs = /* GraphQL */ `
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

  type Categories {
    id: ID!
    name: String!
  }

  type ResultMessage {
    success: String
  }

  input EditCategoryInput {
    name: String
  }
`

export default typeDefs
