import gql from 'graphql-tag';
import ApollosFragments from '@apollosproject/ui-fragments';
import LocalFragments from '../../localFragments';

export const GET_EVENT = gql`
    query getEvent($title: String!) {
        getEventContentByTitle(title:$title) {
            id
            title
            summary
            htmlContent
            
            coverImage {
                name
                sources {
                    uri
                }
            }
            
            tags
            
            callsToAction {
                call
                action
            }

            openLinksInNewTab

            events {
                start
                end
                campuses {
                    name
                }
                location
            }
        }
    }
`;

export const GET_EVENTS = gql`
    query getEvents {
        allEvents {
            id
        }

        featuredEvents {
            edges {
                node {
                    id
                }
            }
        }
    }

    
`;

// ${ApollosFragments.CONTENT_CARD_FRAGMENT}
//     ${LocalFragments.ACCESSORY_FRAGMENT}
//     ${LocalFragments.EVENT_ITEM_FRAGMENT}
