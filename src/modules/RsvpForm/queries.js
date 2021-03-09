import gql from 'graphql-tag';

export const GET_CAMPUSE_SERVICE_TIMES = gql`
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
