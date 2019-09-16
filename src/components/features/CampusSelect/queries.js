import gql from 'graphql-tag'

export const GET_CAMPUSES = gql`
    query getCampuses {
        campuses {
            id
            name
            
            image {
                uri
            }
            
            street1
            city
            state
            postalCode
            
            serviceTimes {
                day
                time
            }
        }
    }
`
