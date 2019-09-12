import Users from './Users'
import Categories from './Categories'

const Posts = `
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
`

export default () => [Posts, Users, Categories];
