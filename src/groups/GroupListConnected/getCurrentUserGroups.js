import gql from 'graphql-tag';

export default gql`
  query getCurrentUserGroups($inputTypes: GroupFilterInput) {
    currentUser {
      id
      profile {
        id
        groups(input: $inputTypes) {
          ... on Group {
            id
            dateTime {
              start
            }
          }
          ... on VolunteerGroup {
            id
          }
          title
          coverImage {
            sources {
              uri
            }
          }
        }
      }
    }
  }
`;
