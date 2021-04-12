import { gql } from '@apollo/client';

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
