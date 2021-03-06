import gql from 'graphql-tag';
import LocalFraments from '../../localFragments';

// eslint-disable-next-line import/prefer-default-export
export const GET_AUTHOR = gql`
  query getAuthor($id: ID!) {
    node(id: $id) {
      ... on ContentItem {
        id
        htmlContent
        ...publishFragment
      }
    }
  }
  ${LocalFraments.PUBLISH_FRAGMENT}
`;
