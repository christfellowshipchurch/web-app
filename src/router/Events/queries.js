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
            id
            title
            startDate
            endDate

            events {
                start
                end
            }
        }
    }
`
