import gql from 'graphql-tag';

export default gql`
  query getCurrentUserGroups {
    currentUser {
      id
      profile {
        id
        groups {
          ... on Group {
            id
            dateTime {
              start
              end
            }
            title
            schedule {
              friendlyScheduleText
            }
            coverImage {
              sources {
                uri
              }
            }
          }
        }
      }
    }
  }
`;
