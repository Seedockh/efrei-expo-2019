import gql from 'graphql-tag';

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
          	CategoryId
          	UserId
        }
    }
`