import gql from 'graphql-tag';

export const GET_EVENT_SCHEDULES = gql`
  query getEventSchedules($id: ID!) {
    node(id: $id) {
      ... on ContentItem {
        id
        childContentItemsConnection {
          edges {
            node {
              id
              ... on EventScheduleItem {
                dates
                campuses {
                  name
                }
                location
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CURRENT_PERSON_CAMPUS = gql`
  query {
    currentUser {
      id
      profile {
        id
        campus {
          id
          name
        }
      }
    }
  }
`;

export const GET_CURRENT_USER_FOR_CHAT_CHANNEL = gql`
  query currentUserForChatChannel {
    currentUser {
      id
      streamChatToken
      profile {
        id
        firstName
        lastName
        photo {
          uri
        }
      }
    }
  }
`;

export const GET_CURRENT_USER_ROLE_FOR_CHAT_CHANNEL = gql`
  query currentUserRoleForChatChannel($channelId: ID!) {
    currentUser {
      id
      streamChatRole(id: $channelId)
    }
  }
`;
