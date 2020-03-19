import gql from 'graphql-tag'

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
            hideLabel

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
`

export const GET_EVENTS = gql`
    query getEvents {
        allEvents {
            ...eventsFragment
        }

        featuredEvents {
            edges {
                node {
                   ...eventsFragment
                }
            }
        }
    }

    fragment eventsFragment on EventContentItem {
        id
        title
        summary
        hideLabel

        nextOccurrence

        coverImage {
            name
            sources {
                uri
            }
        }

        sharing {
            url
            title
            message
        }

        events {
            start
        }
    }
`
