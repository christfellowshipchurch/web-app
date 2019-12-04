import gql from 'graphql-tag'

export const GET_CAMPUSES = gql`
  query {
    campuses {
      id
      name
    }
  }
`

export const GET_ETHNICITY_LIST = gql`
  query {
    getEthnicityList {
      id
      values {
        id
        value
      }
    }
  }
`

export const GET_STATES_LIST = gql`
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