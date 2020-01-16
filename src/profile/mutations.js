import gql from 'graphql-tag'

export const UPDATE_CURRENT_USER = gql`
  mutation updateCurrentUserProfile(
    $profileFields: [UpdateProfileInput]!,
    $address: AddressInput!,
    $campusId: String!,
    $communicationPreferences: [UpdateCommunicationPreferenceInput]!
    ) {

    updateProfileFields(input: $profileFields) {
      id
      firstName
      lastName
      gender
      birthDate
    }

    updateAddress(address:$address) {
      street1
      street2
      city
      state
      postalCode
    }

    updateUserCampus(campusId: $campusId) {
      id
      campus {
        id
        featuredImage {
            uri
        }
        name
      }
    }

    updateCommunicationPreferences(input: $communicationPreferences) {
      communicationPreferences {
        allowSMS
        allowEmail
      }
    }
  }
  `

export const UPDATE_CAMPUS = gql`
  mutation campusChange($campusId: String!) {
    updateUserCampus(campusId: $campusId) {
      id
      campus {
        ...CampusParts
      }
    }
  }
`


export const UPDATE_COMMUNCATION_PREFERENCE = gql`
mutation updateCommunciationPreference(
  $type: UPDATEABLE_COMMUNICATION_PREFERENCES!, 
  $allow: Boolean!) {
    updateCommunicationPreference(type:$type, allow:$allow) {
      communicationPreferences {
        allowEmail
        allowSMS
      }
    }
}
`
