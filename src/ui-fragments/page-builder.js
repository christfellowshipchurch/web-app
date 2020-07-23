import gql from 'graphql-tag';

const CAMPUS_CONTENT_FEATURE_FRAGMENT = gql`
    fragment CampusContentFeatureFragment on CampusContentFeature {
        id
        campus {
            ...CampusParts
        }
        action {
            title
            action
        }
    }
`;

const CONTENT_BLOCK_FEATURE_FRAGMENT = gql`
    fragment ContentBlockFeatureFragment on ContentBlockFeature {
        id
        content {
            ...ContentBlockItemFragment
        }
        display
    }
`;

const CONTENT_BLOCK_ITEM_FRAGMENT = gql`
    fragment ContentBlockItemFragment on ContentBlockItem {
        title
        subtitle
        htmlContent
        image {
            sources {
                uri
            }
        }
        callsToAction {
            call
            action
        }
    }
`;

const CONTENT_GRID_FEATURE_FRAGMENT = gql`
    fragment ContentGridFeatureFragment on ContentGridFeature {
        id

        title
        subtitle
        blocks {
            ...ContentBlockItemFragment
        }
        primaryAction {
            title
            action
        }
    }
`;

const PAGE_BUILDER_FEATURE_FRAGMENT = gql`
    fragment PageBuilderFeatureFragment on PageBuilderFeature {
        ...CampusContentFeatureFragment
        ...ContentBlockFeatureFragment
        ...ContentGridFeatureFragment
    }
`;

export {
    CONTENT_BLOCK_ITEM_FRAGMENT,
    CONTENT_BLOCK_FEATURE_FRAGMENT,
    CAMPUS_CONTENT_FEATURE_FRAGMENT,
    CONTENT_GRID_FEATURE_FRAGMENT,
    PAGE_BUILDER_FEATURE_FRAGMENT,
};
