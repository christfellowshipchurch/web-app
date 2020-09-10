import gql from 'graphql-tag';

export default gql`
  query getGroup($itemId: ID!) {
    node(id: $itemId) {
      __typename
      ... on Group {
        id
        title
        summary
        schedule {
          friendlyScheduleText
        }
        coverImage {
          sources {
            uri
          }
        }
        groupResources {
          title
          action
          relatedNode {
            id
            ... on Url {
              url
            }
          }
        }
        dateTime {
          start
          end
        }
        videoCall {
          labelText
          link
          meetingId
          passcode
        }
        parentVideoCall {
          labelText
          link
          meetingId
          passcode
        }
      }
    }
    currentUser {
      id
      profile {
        id
        firstName
      }
    }
  }
`;
