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
          url
          contentChannelItem
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
