import gql from 'graphql-tag';

export const CREATE_USER = gql`
    mutation createUser($data: EditUserInput!) {
        createUser(data: $data) {
            id
            firstname
            lastname
            city
        } 
    }
`

export const EDIT_USER = gql`
    mutation editUser($id: ID!, $data: EditUserInput!) {
        editUser(id: $id, data: $data) {
            id
            firstname
            lastname
            city
        } 
    }
`

export const CREATE_POST = gql`
    mutation createPost($data: EditPostInput!) {
        createPost(data: $data) {
            id
            title
            price
            image
            CategoryId
            UserId
        } 
    }
`

export const DELETE_POST = gql`
    mutation deletePost($id: ID!) {
        deletePost(id: $id) {
            success
        } 
    }
`

export const EDIT_POST = gql`
    mutation editPost($id: ID!, $data: EditPostInput!) {
        editPost(id: $id, data: $data) {
            id
            title
            price
            image
            CategoryId
            UserId
        } 
    }
`