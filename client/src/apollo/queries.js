import gql from 'graphql-tag';

export const LOGIN = gql`
  query login($firstname: String, $lastname: String) {
    login(data: {
      firstname: $firstname
      lastname: $lastname
    }) {
      id
      firstname
      lastname
      city
    }
  }
`

export const GET_USERS = gql`
    query {
        users {
            firstname
            lastname
            city
        }
    }
`

export const GET_CATEGORIES = gql`
    query {
        categories {
            id
            name
        }
    }
`

export const GET_POSTS = gql`
    query {
        posts {
            id
            title
            price
            image
          	CategoryId
          	UserId
        }
    }
`

export const GET_POST = gql`
    query post($id: ID!) {
        post(id: $id) {
            id
            title
            price
            image
          	user {
                id
                firstname
                lastname
                city
            }
          	category {
                id
                name
            }
        }
    }
`

export const GET_USER = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            firstname
            lastname
            city
            posts {
                id
                title
                price
                image
                CategoryId
                category {
                    name
                }
            }
        }
    }
`

export const GET_USER_POSTS = gql`
    query userPosts($id: ID!){
    	userPosts(id: $id) {
        id
        title
        price
        image
        CategoryId
      }
    }
`
