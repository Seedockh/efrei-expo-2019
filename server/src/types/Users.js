import Posts from './Posts';

const Users = `
  type Users {
    id: ID!
    firstname: String!
    lastname: String!
    city: String!
    posts: [Posts]!
  }
`

export default () => [Users, Posts];
