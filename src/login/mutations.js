import gql from 'graphql-tag'

export const REQUEST_PIN = gql`
  mutation requestPin($phoneNumber: String!) {
    requestSmsLoginPin(phoneNumber: $phoneNumber) {
      success
      isExistingIdentity
    }
  }
`

export const IS_VALID_IDENTITY = gql`
  mutation isValidIdentity($identity: String!) {
    isValidIdentity(identity: $identity) {
      success
      isExistingIdentity
    }
  }
`

export const AUTHENTICATE_CREDENTIALS = gql`
  mutation authenticateCredentials($identity: String!, $passcode: String!) {
    authenticateCredentials(identity: $identity, passcode: $passcode) {
      token
    }
  }
`

export const CREATE_NEW_LOGIN = gql`
  mutation createNewUserAccount($identity: String!, $passcode: String!) {
    createNewUserLogin(identity: $identity, passcode: $passcode) {
      token
    }
  }
`

export const HANDLE_NEW_LOGIN = gql`
  mutation handleNewUserAccount($identity: String!, $passcode: String!) {
    createNewUserAccount(identity: $identity, passcode: $passcode) {
      token
    }
  }
`