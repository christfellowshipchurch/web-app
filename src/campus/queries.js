import gql from 'graphql-tag'

export const GET_CAMPUS = gql`
    query getCampus($name:String!) {
        campus(name:$name) {
            id
            name
            
            image {
                uri
            }
            
            featuredImage {
                uri
            }

            pastor {
                firstName
                lastName
                email
                photo {
                    uri
                }
            }

            campusFeatures {
                title
                summary
                icon
                options
                htmlContent
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

export const GET_CAMPUS_FAQ = gql`
    query getFAQ($name:String) {
        campusFAQ(name:$name) {
            id
            title
            htmlContent
        }
    }
`

export const GET_CAMPUS_BLOCKS = gql`
    query getCampusBlocks($name:String!) {
        campusContentItems(name:$name) {
            id
            title
            htmlContent
            coverImage {
                sources {
                    uri
                }
            }

            videos {
                sources {
                    uri
                }
            }
        }
    }
`