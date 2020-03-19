import gql from 'graphql-tag';

export const GET_EVENT_SCHEDULES = gql`
    query getEventSchedules($id: ID!) {
        node(id: $id) {
            ... on ContentItem {
                id
                childContentItemsConnection {
                    edges {
                        node {
                            id
                            ... on EventScheduleItem {
                                dates
                                campuses {
                                    name
                                }
                                location
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const GET_CURRENT_PERSON_CAMPUS = gql`
    query {
        currentUser {
            profile {
                campus {
                    name
                }
            }
        }
    }
`;

export const GET_CAMPUS_ADDRESSES = gql`
    query getCampuses {
        campuses {
            id
            name
        
            street1
            postalCode
            state
            city
        }
    }
`;