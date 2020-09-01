import gql from 'graphql-tag';
import ApollosFragments from '@apollosproject/ui-fragments';
import LocalFragments from '../localFragments';

const GET_CONTENT_CARD = gql`
  query getContentCard($contentId: ID!) {
    node(id: $contentId) {
      id
      __typename
      ...contentCardFragment
      ...accessoryFragment
    }
  }
  ${ApollosFragments.CONTENT_CARD_FRAGMENT}
  ${LocalFragments.ACCESSORY_FRAGMENT}
`;

export default GET_CONTENT_CARD;
