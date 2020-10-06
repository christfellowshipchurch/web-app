import gql from 'graphql-tag';

export default gql`
  query getCurrentUserGroups {
    currentUser {
      id
      profile {
        id
        groups(input: { excludeTypes: [DreamTeam] }) {
          ... on Group {
            id
            dateTime {
              start
            }
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
