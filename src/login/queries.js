import gql from 'graphql-tag';

export const USER_EXISTS = gql`
  query userExists($identity: String!) {
    userExists(identity: $identity)
  }
`;
