import gql from 'graphql-tag';
import Fragments from 'ui-fragments';

export default gql`
  query getPageBuilderFeatures($url: String!) {
    pageBuilderFeatures(url:$url) {
        ...PageBuilderFeatureFragment
    }
  }
  ${Fragments.CAMPUS_PARTS_FRAGMENT}
  ${Fragments.CAMPUS_CONTENT_FEATURE_FRAGMENT}
  ${Fragments.CONTENT_BLOCK_FEATURE_FRAGMENT}
  ${Fragments.CONTENT_BLOCK_ITEM_FRAGMENT}
  ${Fragments.CONTENT_GRID_FEATURE_FRAGMENT}
  ${Fragments.PAGE_BUILDER_FEATURE_FRAGMENT}
`;
