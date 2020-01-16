import gql from 'graphql-tag'

//Queries for dropdown selectors
export const GET_CAMPUSES = gql`
  query {
    campuses {
      id
      name
    }
  }
`

export const GET_STATES = gql`
  query {
    getStatesList {
      id
      values {
        id
        value
      }
    }
  }
`

//Queries for current person attributes
export const GET_CURRENT_PERSON = gql`
    query {
        currentUser {
          id
            profile {
                firstName
                lastName

                email
                phoneNumber

                gender
                ethnicity
                birthDate

                communicationPreferences {
                  allowPushNotification
                  allowSMS
                  allowEmail
                }

                campus {
                  id
                  featuredImage {
                      uri
                  }
                  name
                }

                photo {
                    uri
                }
                
                address {
                    street1
                    city
                    state
                    postalCode
                }
            }      
        }
    }
`

export const GET_CURRENT_CAMPUS = gql`
  query getAllCampuses($latitude: Float!, $longitude: Float!) {
    campuses(location: { latitude: $latitude, longitude: $longitude }) {
      ...CampusParts
    }
    currentUser {
      id
      profile {
        id
        campus {
          ...CampusParts
        }
      }
    }
  }`