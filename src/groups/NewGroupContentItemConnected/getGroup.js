import gql from 'graphql-tag';

export default gql`
  query getGroup($itemId: ID!) {
    node(id: $itemId) {
      __typename
      ... on Group {
        id
        title
        summary
        coverImage {
          sources {
            uri
          }
        }
        groupResources {
          id
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
        members {
          id
          nickName
          firstName
          lastName
          photo {
            uri
          }
        }
        leaders {
          id
          nickName
          firstName
          lastName
          photo {
            uri
          }
        }
        streamChatChannel {
          id
          channelId
        }
      }
    }
    currentUser {
      id
      profile {
        id
        firstName
        nickName
      }
    }
  }
`;
