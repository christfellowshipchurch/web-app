import gql from 'graphql-tag'

import { LARGE_CARD_FRAGMENT } from '../content-card-connected'

export const GET_FEED_FEATURES = gql`
    query getFeedFeatures {
        userFeedFeatures {
            ... on ActionListFeature {
                id
                title
                subtitle
                actions {
                    id
                    title
                    subtitle
                    action
                    image {
                        sources {
                        uri
                        }
                    }
                    relatedNode {
                        id
                    }
                }
            }
        }
    }
`
