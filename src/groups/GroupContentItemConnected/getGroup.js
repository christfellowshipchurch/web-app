import gql from 'graphql-tag';
import GROUP_FRAGMENT from '../groupFragment';

export default gql`
  query getGroup($itemId: ID!) {
    node(id: $itemId) {
      __typename
      ... on Group {
        ...groupFragment
      }
    }
    currentUser {
      id
      profile {
        id
        firstName
      }
    }
  }
  ${GROUP_FRAGMENT}
`;
