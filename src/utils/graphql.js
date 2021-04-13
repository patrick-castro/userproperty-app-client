import { gql } from '@apollo/client';

// Searches all existing users that have a match in the search string
export const QUERY_USERS = gql`
  query search($searchString: String!) {
    users(searchString: $searchString) {
      id
      firstName
      lastName
      properties {
        id
        street
        city
        state
        zip
        rent
      }
    }
  }
`;

// Searches the full name of all existing users that have a match in the search string
export const QUERY_NAMES = gql`
  query searchNames($searchString: String!) {
    users(searchString: $searchString) {
      id
      fullName
    }
  }
`;
