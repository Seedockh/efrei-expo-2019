import gql from 'graphql-tag';

export const CREATE_USER = gql`
    mutation createUser($data: EditUserInput!) {
        createUser(data: $data) {
            firstname
            lastname
            city
        } 
    }
`