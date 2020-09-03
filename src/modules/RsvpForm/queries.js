import gql from 'graphql-tag';

export const GET_CAMPUSES = gql`
  query getCampuses {
    campuses {
      id
      name

      serviceTimes {
        day
        time
      }
    }
  }
`;
