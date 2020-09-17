import gql from 'graphql-tag';

export const REQUEST_PIN = gql`
  mutation requestPin($phone: String!) {
    requestSmsLoginPin(phoneNumber: $phone) {
      success
    }
  }
`;

export const VERIFY_PIN = gql`
  mutation verifyPin($phone: String!, $code: String!) {
    authenticateWithSms(phoneNumber: $phone, pin: $code) {
      token
    }
  }
`;

export const IS_VALID_IDENTITY = gql`
  mutation isValidIdentity($identity: String!) {
    isValidIdentity(identity: $identity) {
      success
      isExistingIdentity
    }
  }
`;

export const AUTHENTICATE_CREDENTIALS = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(identity: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_NEW_LOGIN = gql`
  mutation createNewUserAccount($identity: String!, $passcode: String!) {
    createNewUserLogin(identity: $identity, passcode: $passcode) {
      token
    }
  }
`;

export const REGISTER_WITH_SMS = gql`
  mutation registerWithSms(
    $identity: String!
    $password: String!
    $userProfile: [UpdateProfileInput]
  ) {
    registerWithSms(phoneNumber: $identity, pin: $password, userProfile: $userProfile) {
      token
      user {
        id
        profile {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const REGISTER_WITH_EMAIL = gql`
  mutation register(
    $identity: String!
    $password: String!
    $userProfile: [UpdateProfileInput]
  ) {
    registerPerson(email: $identity, password: $password, userProfile: $userProfile) {
      token
      user {
        id
        profile {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const REQUEST_PASSWORD_CHANGE = gql`
  mutation changePasswordWithPin($email: String!, $pin: String!, $newPassword: String!) {
    changePasswordWithPin(email: $email, pin: $pin, newPassword: $newPassword) {
      token
    }
  }
`;

export const REQUEST_EMAIL_PIN = gql`
  mutation requestEmailLoginPin($email: String!) {
    requestEmailLoginPin(email: $email)
  }
`;
