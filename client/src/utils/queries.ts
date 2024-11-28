import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      username
      email
      savedBooks {
        title
        author
        description
        bookId
      }
    }
  }
`;
